from flask import Flask
from flask_cors import CORS
from src.database.connector import db_connector

# Routes
from src.core.routes.api.api_routes import api_route

db_connector.connect_to_db()

app = Flask(__name__)
CORS(app)

app.register_blueprint(api_route)