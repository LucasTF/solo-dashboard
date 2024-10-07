from abc import ABC, abstractmethod

from src.controllers.types.auth_response_type import AuthResponse


class AuthControllerInterface(ABC):
    @abstractmethod
    def authenticate(self, email: str, password: str) -> AuthResponse:
        pass
