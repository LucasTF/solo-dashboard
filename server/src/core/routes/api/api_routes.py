from flask import Blueprint
from pydantic_core import ValidationError

from src.errors.generic_api_error import GenericApiError
from src.errors.invalid_credentials_error import InvalidCredentialsError
from src.errors.invalid_request_body_field_error import InvalidRequestBodyFieldError
from src.errors.unavailable_resource_error import UnavailableResourceError

# Routes
from src.core.routes.api.usuario_routes import usuario_route
from src.core.routes.api.auth_routes import auth_route


api_route = Blueprint("api_routes", __name__, url_prefix="/api")

# Errors
api_route.register_error_handler(UnavailableResourceError, UnavailableResourceError.handle)
api_route.register_error_handler(InvalidRequestBodyFieldError, InvalidRequestBodyFieldError.handle)
api_route.register_error_handler(ValidationError, InvalidRequestBodyFieldError.handle)
api_route.register_error_handler(InvalidCredentialsError, InvalidCredentialsError.handle)
api_route.register_error_handler(Exception, GenericApiError.handle)

api_route.register_blueprint(usuario_route)
api_route.register_blueprint(auth_route)