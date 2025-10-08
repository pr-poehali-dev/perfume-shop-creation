import json
import os
import psycopg2
from datetime import datetime
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Save customer order to database
    Args: event - dict with httpMethod, body (order data)
          context - object with request_id attribute
    Returns: HTTP response with order confirmation
    '''
    method: str = event.get('httpMethod', 'POST')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Parse request body
    body_data = json.loads(event.get('body', '{}'))
    
    # Extract order data
    customer_name = body_data.get('name')
    customer_phone = body_data.get('phone')
    customer_email = body_data.get('email')
    delivery_method = body_data.get('deliveryMethod')
    delivery_address = body_data.get('address', '')
    city = body_data.get('city', '')
    postal_code = body_data.get('postalCode', '')
    comment = body_data.get('comment', '')
    payment_method = body_data.get('paymentMethod')
    total_amount = body_data.get('totalAmount')
    delivery_price = body_data.get('deliveryPrice')
    items = body_data.get('items', [])
    
    # Generate order number
    order_number = f"ORD-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    
    # Connect to database
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    try:
        # Insert order
        cursor.execute('''
            INSERT INTO orders (
                order_number, customer_name, customer_phone, customer_email,
                delivery_method, delivery_address, city, postal_code,
                comment, payment_method, total_amount, delivery_price, status
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        ''', (
            order_number, customer_name, customer_phone, customer_email,
            delivery_method, delivery_address, city, postal_code,
            comment, payment_method, total_amount, delivery_price, 'pending'
        ))
        
        order_id = cursor.fetchone()[0]
        
        # Insert order items
        for item in items:
            cursor.execute('''
                INSERT INTO order_items (
                    order_id, perfume_id, perfume_name, perfume_brand, quantity, price
                ) VALUES (%s, %s, %s, %s, %s, %s)
            ''', (
                order_id, item['id'], item['name'], item['brand'],
                item['quantity'], item['price']
            ))
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'orderNumber': order_number,
                'orderId': order_id
            })
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
