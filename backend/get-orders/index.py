import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage orders - get all, update, delete
    Args: event - dict with httpMethod (GET/PUT/DELETE), body, headers (X-Admin-Password)
          context - object with request_id attribute
    Returns: HTTP response with orders list or update/delete confirmation
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    # Check admin password for all methods
    headers = event.get('headers', {})
    admin_password = headers.get('x-admin-password') or headers.get('X-Admin-Password')
    expected_password = os.environ.get('ADMIN_PASSWORD')
    
    if admin_password != expected_password:
        return {
            'statusCode': 401,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    # Connect to database
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            # Get all orders
            cursor.execute('''
                SELECT 
                    id, order_number, customer_name, customer_phone, customer_email,
                    delivery_method, delivery_address, city, postal_code,
                    comment, payment_method, total_amount, delivery_price, status,
                    created_at, updated_at
                FROM orders
                ORDER BY created_at DESC
            ''')
            
            orders = []
            for row in cursor.fetchall():
                order = {
                    'id': row[0],
                    'orderNumber': row[1],
                    'customerName': row[2],
                    'customerPhone': row[3],
                    'customerEmail': row[4],
                    'deliveryMethod': row[5],
                    'deliveryAddress': row[6],
                    'city': row[7],
                    'postalCode': row[8],
                    'comment': row[9],
                    'paymentMethod': row[10],
                    'totalAmount': float(row[11]),
                    'deliveryPrice': float(row[12]),
                    'status': row[13],
                    'createdAt': row[14].isoformat() if row[14] else None,
                    'updatedAt': row[15].isoformat() if row[15] else None,
                    'items': []
                }
                
                # Get order items
                cursor.execute('''
                    SELECT perfume_id, perfume_name, perfume_brand, quantity, price
                    FROM order_items
                    WHERE order_id = %s
                ''', (row[0],))
                
                for item_row in cursor.fetchall():
                    order['items'].append({
                        'perfumeId': item_row[0],
                        'perfumeName': item_row[1],
                        'perfumeBrand': item_row[2],
                        'quantity': item_row[3],
                        'price': float(item_row[4])
                    })
                
                orders.append(order)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'orders': orders})
            }
        
        elif method == 'DELETE':
            # Delete order
            body_data = json.loads(event.get('body', '{}'))
            order_id = body_data.get('orderId')
            
            # Delete order items first (foreign key constraint)
            cursor.execute('DELETE FROM order_items WHERE order_id = %s', (order_id,))
            # Delete order
            cursor.execute('DELETE FROM orders WHERE id = %s', (order_id,))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'success': True, 'message': 'Order deleted'})
            }
        
        elif method == 'PUT':
            # Update order
            body_data = json.loads(event.get('body', '{}'))
            order_id = body_data.get('orderId')
            
            # Build update query dynamically
            update_fields = []
            update_values = []
            
            if 'status' in body_data:
                update_fields.append('status = %s')
                update_values.append(body_data['status'])
            
            if 'customerName' in body_data:
                update_fields.append('customer_name = %s')
                update_values.append(body_data['customerName'])
            
            if 'customerPhone' in body_data:
                update_fields.append('customer_phone = %s')
                update_values.append(body_data['customerPhone'])
            
            if 'customerEmail' in body_data:
                update_fields.append('customer_email = %s')
                update_values.append(body_data['customerEmail'])
            
            if 'deliveryAddress' in body_data:
                update_fields.append('delivery_address = %s')
                update_values.append(body_data['deliveryAddress'])
            
            if 'city' in body_data:
                update_fields.append('city = %s')
                update_values.append(body_data['city'])
            
            if 'comment' in body_data:
                update_fields.append('comment = %s')
                update_values.append(body_data['comment'])
            
            if update_fields:
                update_fields.append('updated_at = CURRENT_TIMESTAMP')
                update_values.append(order_id)
                
                query = f"UPDATE orders SET {', '.join(update_fields)} WHERE id = %s"
                cursor.execute(query, update_values)
                conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'success': True, 'message': 'Order updated'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        cursor.close()
        conn.close()
