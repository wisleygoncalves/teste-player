import smtplib
import ssl

from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from email.mime.text import MIMEText

import mercadopago

sdk = mercadopago.SDK("YOUR_ACCESS_TOKEN")

SERVER = ''
SENDER = ''
USERNAME = ''
PASSWORD = ''
TEXT_SUBTYPE = 'plain'


def message_user(email, game, nickname, phone):
    message = """
        Olá! Obrigado por se Inscrever nos eventos da PlayerBook!\

        Seus dados enviados:\
        e-mail: {}\
        jogo: {}\
        nickname: {}\
        telefone: {}\

        Entraremos em contato em breve. Bom Jogo!
    """
    return message.format(email, game, nickname, phone)

def message_system(email, game, nickname, phone):
    message = """
        Alguém se inscreveu em eventos!\

        Dados enviados:\
        e-mail: {}\
        jogo: {}\
        nickname: {}\
        telefone: {}\

        Entraremos em contato em breve. Bom Jogo!
    """
    return message.format(email, game, nickname, phone)


class PreferenceData(BaseModel):
    title: str
    price: float
    quantity: int


class EmailPurchase(BaseModel):
    subject: str
    content: str
    email_from: str
    name: str
    nickname: str


class EmailSend(BaseModel):
    subject: str
    content: str
    email_from: str
    name: str
    nickname: str
    email: str
    phone: str
    idade: str
    wallet: str
    message: str


@app.post("/mp/")
def create_preference(item: PreferenceData):
    preference_data =  {"items": [{"title": item.title, "price": item.price, "quantity": item.quantity}]}
    preference_response = sdk().preference.create(preference_data)
    return preference_response["response"]


@app.post("/send-mail/")
def send_mail(email: EmailData):
    
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login("my@gmail.com", password)
        server.sendmail(sender_email, receiver_email, message)
    return {'data': 'E-mail sent', status=202}
