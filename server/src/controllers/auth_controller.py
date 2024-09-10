from src.controllers.interfaces.auth_controller_interface import AuthControllerInterface
from src.controllers.types.auth_response_type import AuthResponse
from src.errors.invalid_credentials_error import InvalidCredentialsError
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.entities.usuario import Usuario
from src.models.repositories.usuario_repository import UsuarioRepository
from src.services.jwt_service import JwtService
from src.services.password_encrypt_service import PasswordEncryptService

class AuthController(AuthControllerInterface):

    def __init__(self, usuario_repository: UsuarioRepository) -> None:
        self.__usuario_repository = usuario_repository
        self.__password_service = PasswordEncryptService()
        self.__jwt_service = JwtService()

    def authenticate(self, email: str, password: str) -> AuthResponse:
        try:
            user = self.__find_user(email)
        except UnavailableResourceError:
            raise InvalidCredentialsError()
        
        self.__compare_passwords(password, user.password)
        token = self.__create_jwt_token(user.id)

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "is_admin": user.is_admin,
            "authorization": token
        }
    
    def __find_user(self, email: str) -> Usuario:
        user = self.__usuario_repository.get_usuario_by_email(email)

        return user
    
    def __compare_passwords(self, password: str, hashed_password: str) -> None:
        if not self.__password_service.check_password(password, hashed_password):
            raise InvalidCredentialsError()
        
    def __create_jwt_token(self, id: int) -> str:
        payload = {
            "id": id
        }
        token = self.__jwt_service.create_jwt_token(payload)

        return token
        
    