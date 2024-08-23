import bcrypt
from typing import Dict, List

from pydantic import ValidationError

from src.models.entities.usuario import Usuario
from src.models.interfaces.usuario_repository_interface import UsuarioRepositoryInterface
from src.models.serials.serial_response import SerialResponse
from src.models.serials.serial_usuario import SerialUsuario

class UsuarioController:

    def __init__(self, usuario_repository: UsuarioRepositoryInterface) -> None:
        self.__usuario_repository = usuario_repository

    def create(self, user_info: Dict) -> SerialResponse:
        try:
            val_usuario = self.__validate_usuario(user_info)
            self.__usuario_repository.insert_usuario(
                name=val_usuario.name,
                email=val_usuario.email,
                password=self.__hash_password(val_usuario.password),
                is_admin=val_usuario.is_admin
            )

            return SerialResponse(message='Usuário criado com sucesso.')
        except ValidationError as ve:
            print(ve)
            return SerialResponse(
                message='Não foi possível criar o usuário.',
                details='Dados inválidos.'
                )
        except Exception as exc:
            print(exc)
            return SerialResponse(message='Não foi possível criar o usuário.')
        
    def find_by_id(self, user_id: int) -> SerialUsuario | None:
        usuario = self.__usuario_repository.get_usuario_by_id(user_id)

        if not usuario:
            return None
        
        return self.__serialize(usuario)
    
    def find_by_email(self, user_email: str) -> SerialUsuario | None:
        usuario = self.__usuario_repository.get_usuario_by_email(user_email)

        if not usuario:
            return None
        
        return self.__serialize(usuario)

    def list(self) -> List[SerialUsuario]:
        serial_usuarios = []
        usuarios = self.__usuario_repository.list_usuarios()

        for usuario in usuarios:
            serial_usuarios.append(self.__serialize(usuario))

        return serial_usuarios
    
    def delete(self, user_id: int) -> None:
        try:
            self.__usuario_repository.delete_usuario(user_id)
        except Exception as exc:
            print(exc)

    def __serialize(self, usuario: Usuario) -> SerialUsuario:
        serial_usuario = SerialUsuario(
            id=usuario.id,
            name=usuario.name,
            email=usuario.email,
            password=usuario.password,
            is_admin=usuario.is_admin
        )

        return serial_usuario
    
    def __validate_usuario(self, usuario_dict: Dict) -> SerialUsuario:
        try:
            serialized_usuario = SerialUsuario(
            name=usuario_dict['name'], 
            email=usuario_dict['email'],
            password=usuario_dict['password'],
            is_admin=(usuario_dict['is_admin'] if 'is_admin' in usuario_dict else False)
            )
            return serialized_usuario
        except Exception as exc:
            raise exc
        
    def __hash_password(self, password: str) -> bytes:
        hashed_password = bcrypt.hashpw(str.encode(password), bcrypt.gensalt())
        return hashed_password
