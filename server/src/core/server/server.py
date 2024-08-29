from flask import Flask
from flask_cors import CORS
from src.database.connector import db_connector

from src.errors.unavailable_resource_error import UnavailableResourceError

# Routes
from src.core.routes.usuario_routes import usuario_route

db_connector.connect_to_db()

app = Flask(__name__)
CORS(app)

# Errors
app.register_error_handler(UnavailableResourceError, UnavailableResourceError.handle)

app.register_blueprint(usuario_route)