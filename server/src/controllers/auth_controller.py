from src.controllers.interfaces.auth_controller_interface import AuthControllerInterface
from src.controllers.types.auth_response_type import AuthResponse
from src.errors.invalid_credentials_error import InvalidCredentialsError
from src.models.interfaces.usuario_repository_interface import (
    UsuarioRepositoryInterface,
)
from src.validators.valid_usuario import ValidUsuario
from src.services.jwt_service import JwtService
from src.services.password_encrypt_service import PasswordEncryptService


class AuthController(AuthControllerInterface):
    def __init__(self, usuario_repository: UsuarioRepositoryInterface) -> None:
        self.__usuario_repository = usuario_repository
        self.__password_service = PasswordEncryptService()
        self.__jwt_service = JwtService()

    def authenticate(self, email: str, password: str) -> AuthResponse:
        try:
            self.__validate_login(email, password)
            user = self.__usuario_repository.get_usuario_by_email(email)

            if user is None:
                raise InvalidCredentialsError
        except ValueError:
            raise InvalidCredentialsError

        self.__compare_passwords(password, user.password)
        token = self.__create_jwt_token(user.id, user.is_admin)

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "is_admin": user.is_admin,
            "authorization": token,
        }

    def __validate_login(self, email: str, password: str):
        ValidUsuario.__pydantic_validator__.validate_assignment(
            ValidUsuario.model_construct(), "email", email
        )
        ValidUsuario.__pydantic_validator__.validate_assignment(
            ValidUsuario.model_construct(), "password", password
        )

    def __compare_passwords(self, password: str, hashed_password: str | bytes) -> None:
        if not self.__password_service.check_password(password, hashed_password):
            raise InvalidCredentialsError

    def __create_jwt_token(self, id: int, is_admin: bool = False) -> str:
        payload = {"id": id, "is_admin": is_admin}
        token = self.__jwt_service.create_jwt_token(payload)

        return token
