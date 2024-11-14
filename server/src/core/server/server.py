from flask import Flask
from flask_cors import CORS
from src.database.connector import db_connector

from jwt import DecodeError, ExpiredSignatureError

from src.errors.expired_jwt_token_error import ExpiredJwtTokenError
from src.errors.generic_api_error import GenericApiError
from src.errors.invalid_jwt_token_error import InvalidJwtTokenError
from src.errors.unauthenticated_error import UnauthenticatedError
from src.errors.unauthorized_error import UnauthorizedError

# Routes
from src.core.routes.api.api_routes import api_route
from src.core.routes.dashboard.dashboard_routes import dashboard_route
from src.core.routes.static import static_content

db_connector.connect_to_db()

app = Flask(__name__)
CORS(app)

# Config Flags
app.json.sort_keys = False  # Stop Flask from sorting JSON response keys alphabetically

# Errors
app.register_error_handler(DecodeError, InvalidJwtTokenError.handle)
app.register_error_handler(ExpiredSignatureError, ExpiredJwtTokenError.handle)
app.register_error_handler(UnauthenticatedError, UnauthenticatedError.handle)
app.register_error_handler(UnauthorizedError, UnauthorizedError.handle)
app.register_error_handler(Exception, GenericApiError.handle)

# API Routes
app.register_blueprint(api_route)

# Dashboard Routes
app.register_blueprint(dashboard_route)

## Static content
app.register_blueprint(static_content)
