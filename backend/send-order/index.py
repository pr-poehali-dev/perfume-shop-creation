import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заказа на Telegram и Email
    Args: event с httpMethod, body (cart, customer)
    Returns: HTTP response с результатом отправки
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    cart = body_data.get('cart', [])
    customer = body_data.get('customer', {})
    
    if not cart or not customer:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Корзина или данные клиента не переданы'})
        }
    
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    admin_email = os.environ.get('ADMIN_EMAIL')
    
    total = sum(item['price'] * item['quantity'] for item in cart)
    
    order_text = f"🛍 Новый заказ!\n\n"
    order_text += f"👤 Клиент:\n"
    order_text += f"Имя: {customer.get('name', 'Не указано')}\n"
    order_text += f"Телефон: {customer.get('phone', 'Не указано')}\n"
    order_text += f"Email: {customer.get('email', 'Не указано')}\n"
    order_text += f"Адрес: {customer.get('address', 'Не указано')}\n\n"
    order_text += f"📦 Товары:\n"
    
    for item in cart:
        order_text += f"• {item['name']} ({item['brand']}) - {item['quantity']} шт. x {item['price']} ₽\n"
    
    order_text += f"\n💰 Итого: {total} ₽"
    
    results = {'telegram': False, 'email': False}
    
    if telegram_token and telegram_chat_id:
        try:
            url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
            data = urllib.parse.urlencode({
                'chat_id': telegram_chat_id,
                'text': order_text,
                'parse_mode': 'HTML'
            }).encode('utf-8')
            
            req = urllib.request.Request(url, data=data)
            response = urllib.request.urlopen(req)
            results['telegram'] = True
        except Exception as e:
            print(f"Telegram error: {e}")
    
    if admin_email:
        try:
            smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
            smtp_port = int(os.environ.get('SMTP_PORT', '587'))
            smtp_user = os.environ.get('SMTP_USER')
            smtp_password = os.environ.get('SMTP_PASSWORD')
            
            if smtp_user and smtp_password:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = f'Новый заказ на сумму {total} ₽'
                msg['From'] = smtp_user
                msg['To'] = admin_email
                
                html_content = f"""
                <html>
                  <body style="font-family: Arial, sans-serif;">
                    <h2>🛍 Новый заказ</h2>
                    
                    <h3>👤 Данные клиента:</h3>
                    <ul>
                      <li><strong>Имя:</strong> {customer.get('name', 'Не указано')}</li>
                      <li><strong>Телефон:</strong> {customer.get('phone', 'Не указано')}</li>
                      <li><strong>Email:</strong> {customer.get('email', 'Не указано')}</li>
                      <li><strong>Адрес:</strong> {customer.get('address', 'Не указано')}</li>
                    </ul>
                    
                    <h3>📦 Товары:</h3>
                    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
                      <tr>
                        <th>Товар</th>
                        <th>Бренд</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Сумма</th>
                      </tr>
                """
                
                for item in cart:
                    item_total = item['price'] * item['quantity']
                    html_content += f"""
                      <tr>
                        <td>{item['name']}</td>
                        <td>{item['brand']}</td>
                        <td>{item['quantity']}</td>
                        <td>{item['price']} ₽</td>
                        <td>{item_total} ₽</td>
                      </tr>
                    """
                
                html_content += f"""
                    </table>
                    
                    <h3>💰 Итого: {total} ₽</h3>
                  </body>
                </html>
                """
                
                part = MIMEText(html_content, 'html', 'utf-8')
                msg.attach(part)
                
                with smtplib.SMTP(smtp_host, smtp_port) as server:
                    server.starttls()
                    server.login(smtp_user, smtp_password)
                    server.send_message(msg)
                
                results['email'] = True
        except Exception as e:
            print(f"Email error: {e}")
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'results': results,
            'message': 'Заказ отправлен'
        })
    }
