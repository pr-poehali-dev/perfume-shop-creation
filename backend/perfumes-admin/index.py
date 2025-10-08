import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Admin API for managing perfumes - create, update, delete
    Args: event with httpMethod, body; context with request_id
    Returns: HTTP response with operation result
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cursor.execute('''
                INSERT INTO perfumes (name, brand, price, category, volume, notes, image, concentration, availability)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, name, brand, price, category, volume, notes, image, concentration, availability
            ''', (
                body['name'], body['brand'], body['price'], body['category'],
                body['volume'], body['notes'], body.get('image', '/placeholder.svg'),
                body.get('concentration'), body.get('availability', True)
            ))
            
            new_perfume = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(dict(new_perfume), ensure_ascii=False)
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            perfume_id = body.get('id')
            
            cursor.execute('''
                UPDATE perfumes
                SET name = %s, brand = %s, price = %s, category = %s,
                    volume = %s, notes = %s, image = %s, concentration = %s, availability = %s
                WHERE id = %s
                RETURNING id, name, brand, price, category, volume, notes, image, concentration, availability
            ''', (
                body['name'], body['brand'], body['price'], body['category'],
                body['volume'], body['notes'], body.get('image', '/placeholder.svg'),
                body.get('concentration'), body.get('availability', True), perfume_id
            ))
            
            updated_perfume = cursor.fetchone()
            conn.commit()
            
            if not updated_perfume:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Perfume not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps(dict(updated_perfume), ensure_ascii=False)
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {}) or {}
            perfume_id = query_params.get('id')
            
            if not perfume_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing id parameter'})
                }
            
            cursor.execute('DELETE FROM perfumes WHERE id = %s RETURNING id', (perfume_id,))
            deleted = cursor.fetchone()
            conn.commit()
            
            if not deleted:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Perfume not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'success': True, 'id': deleted['id']})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        cursor.close()
        conn.close()
