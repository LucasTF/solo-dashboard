from flask import Blueprint
from jwt import DecodeError, ExpiredSignatureError
from pydantic_core import ValidationError

from src.errors.expired_jwt_token_error import ExpiredJwtTokenError
from src.errors.generic_api_error import GenericApiError
from src.errors.internal_processing_error import InternalProcessingError
from src.errors.invalid_credentials_error import InvalidCredentialsError
from src.errors.invalid_jwt_token_error import InvalidJwtTokenError
from src.errors.invalid_operation_error import InvalidOperationError
from src.errors.invalid_param_error import InvalidParamError
from src.errors.invalid_request_body_field_error import InvalidRequestBodyFieldError
from src.errors.unauthenticated_error import UnauthenticatedError
from src.errors.unauthorized_error import UnauthorizedError
from src.errors.unavailable_resource_error import UnavailableResourceError

# Routes
from src.core.routes.api.usuario_routes import usuario_route
from src.core.routes.api.cliente_routes import cliente_route
from src.core.routes.api.obra_routes import obra_route
from src.core.routes.api.auth_routes import auth_route


api_route = Blueprint("api_routes", __name__, url_prefix="/api")

# Errors
api_route.register_error_handler(
    UnavailableResourceError, UnavailableResourceError.handle
)
api_route.register_error_handler(
    InvalidRequestBodyFieldError, InvalidRequestBodyFieldError.handle
)
api_route.register_error_handler(ValidationError, InvalidRequestBodyFieldError.handle)
api_route.register_error_handler(
    InvalidCredentialsError, InvalidCredentialsError.handle
)
api_route.register_error_handler(InvalidOperationError, InvalidOperationError.handle)
api_route.register_error_handler(InvalidParamError, InvalidParamError.handle)
api_route.register_error_handler(
    InternalProcessingError, InternalProcessingError.handle
)
api_route.register_error_handler(DecodeError, InvalidJwtTokenError.handle)
api_route.register_error_handler(ExpiredSignatureError, ExpiredJwtTokenError.handle)
api_route.register_error_handler(UnauthenticatedError, UnauthenticatedError.handle)
api_route.register_error_handler(UnauthorizedError, UnauthorizedError.handle)
api_route.register_error_handler(Exception, GenericApiError.handle)

api_route.register_blueprint(usuario_route)
api_route.register_blueprint(cliente_route)
api_route.register_blueprint(obra_route)
api_route.register_blueprint(auth_route)
