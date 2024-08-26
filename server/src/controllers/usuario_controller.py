import bcrypt
from typing import Dict, List

from src.controllers.interfaces.usuario_controller_interface import UsuarioControllerInterface
from src.models.entities.usuario import Usuario
from src.models.interfaces.usuario_repository_interface import UsuarioRepositoryInterface
from src.models.serials.serial_usuario import SerialUsuario

class UsuarioController(UsuarioControllerInterface):

    def __init__(self, usuario_repository: UsuarioRepositoryInterface) -> None:
        self.__repository = usuario_repository

    def create(self, user_info: Dict) -> None:
        try:
            val_usuario = self.__validate_usuario(user_info)
            self.__repository.insert_usuario(
                name=val_usuario.name,
                email=val_usuario.email,
                password=self.__hash_password(val_usuario.password),
                is_admin=val_usuario.is_admin
            )
        except Exception:
            raise Exception
        
    def find_by_id(self, user_id: int) -> Usuario | None:
        usuario = self.__repository.get_usuario_by_id(user_id)

        if not usuario:
            return None
        
        return usuario
    
    def find_by_email(self, user_email: str) -> Usuario | None:
        usuario = self.__repository.get_usuario_by_email(user_email)

        if not usuario:
            return None
        
        return usuario

    def list(self) -> List[Usuario]:
        usuarios = self.__repository.list_usuarios()

        return usuarios
    
    def delete(self, user_id: int) -> None:
        try:
            self.__repository.delete_usuario(user_id)
        except Exception:
            raise Exception

    def update_password(self, user_id: int, new_password: str) -> None:
        try:
            hashed_password = self.__hash_password(new_password)
            self.__repository.update_usuario_password(user_id, hashed_password)
        except Exception:
            raise Exception
        
    def update(self, user_info: Dict) -> None:
        # TODO: Implement this.
        pass
    
    def __validate_usuario(self, usuario_dict: Dict) -> SerialUsuario:
        try:
            serialized_usuario = SerialUsuario(
            name=usuario_dict['name'], 
            email=usuario_dict['email'],
            password=usuario_dict['password'],
            is_admin=(usuario_dict['is_admin'] if 'is_admin' in usuario_dict else False)
            )
            return serialized_usuario
        except Exception:
            raise Exception
        
    def __hash_password(self, password: str) -> bytes:
        hashed_password = bcrypt.hashpw(str.encode(password), bcrypt.gensalt())
        return hashed_password
