from typing import Dict, List

from src.controllers.interfaces.usuario_controller_interface import (
    UsuarioControllerInterface,
)
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.entities.usuario import Usuario
from src.models.interfaces.usuario_repository_interface import (
    UsuarioRepositoryInterface,
)
from src.validators.valid_usuario import ValidUsuario
from src.services.password_encrypt_service import PasswordEncryptService


class UsuarioController(UsuarioControllerInterface):
    def __init__(self, usuario_repository: UsuarioRepositoryInterface) -> None:
        self.__repository = usuario_repository
        self.__password_service = PasswordEncryptService()

    def create(self, user_info: Dict) -> None:
        val_usuario = self.__validate_usuario(user_info)
        self.__repository.insert_usuario(
            name=val_usuario.name,
            email=val_usuario.email,
            password=self.__password_service.hash_password(val_usuario.password),
            is_admin=val_usuario.is_admin,
        )

    def find_by_id(self, user_id: int) -> Usuario:
        usuario = self.__repository.get_usuario_by_id(user_id)

        if not usuario:
            raise UnavailableResourceError("Usuário")

        return usuario

    def find_by_email(self, user_email: str) -> Usuario:
        usuario = self.__repository.get_usuario_by_email(user_email)

        if not usuario:
            raise UnavailableResourceError("Usuário")

        return usuario

    def list(self) -> List[Usuario]:
        usuarios = self.__repository.list_usuarios()

        return usuarios

    def delete(self, user_id: int) -> None:
        self.__repository.delete_usuario(user_id)

    def update_password(self, user_id: int, new_password: str) -> None:
        hashed_password = self.__password_service.hash_password(new_password)
        self.__repository.update_usuario_password(user_id, hashed_password)

    def update(self, user_id: int, user_info: Dict) -> None:
        complete_user = {
            "name": user_info["name"]
            if user_info.get("name") is not None
            else "fill name",
            "email": user_info["email"]
            if user_info.get("email") is not None
            else "email@fill.com",
            "is_admin": user_info["is_admin"]
            if user_info.get("is_admin") is not None
            else False,
            "password": "fillerpassword",
        }

        self.__validate_usuario(complete_user)

        self.__repository.update_usuario(
            id=user_id,
            name=user_info.get("name"),
            email=user_info.get("email"),
            is_admin=user_info.get("is_admin"),
        )

    def search(self, search_string: str) -> List[Usuario]:
        usuarios = self.__repository.search_usuarios(search_string)

        return usuarios

    def __validate_usuario(self, usuario_dict: Dict) -> ValidUsuario:
        validated_usuario = ValidUsuario(
            name=usuario_dict.get("name"),
            email=usuario_dict.get("email"),
            password=usuario_dict.get("password"),
            is_admin=(
                usuario_dict.get("is_admin") if "is_admin" in usuario_dict else False
            ),
        )
        return validated_usuario
