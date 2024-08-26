from flask import Flask
from flask_cors import CORS
from src.database.connector import db_connector

db_connector.connect_to_db()

app = Flask(__name__)
CORS(app)

