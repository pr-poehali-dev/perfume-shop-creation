import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all perfumes from database with optional filters
    Args: event with httpMethod, queryStringParameters; context with request_id
    Returns: HTTP response with perfumes list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute('''
        SELECT id, name, brand, price, category, volume, notes, 
               image, concentration, availability
        FROM perfumes
        ORDER BY id
    ''')
    
    perfumes = cursor.fetchall()
    cursor.close()
    conn.close()
    
    result = []
    for p in perfumes:
        result.append({
            'id': p['id'],
            'name': p['name'],
            'brand': p['brand'],
            'price': p['price'],
            'category': p['category'],
            'volume': p['volume'],
            'notes': p['notes'],
            'image': p['image'],
            'concentration': p['concentration'],
            'availability': p['availability']
        })
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(result, ensure_ascii=False)
    }
