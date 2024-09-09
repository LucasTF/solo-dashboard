from flask import Flask
from flask_cors import CORS
from jwt import DecodeError, ExpiredSignatureError
from src.database.connector import db_connector
from src.errors.expired_jwt_token_error import ExpiredJwtTokenError
from src.errors.invalid_jwt_token_error import InvalidJwtTokenError

# Routes
from src.core.routes.api.api_routes import api_route

db_connector.connect_to_db()

app = Flask(__name__)
CORS(app)

# Errors
app.register_error_handler(DecodeError, InvalidJwtTokenError.handle)
app.register_error_handler(ExpiredSignatureError, ExpiredJwtTokenError.handle)

# API Routes
app.register_blueprint(api_route)