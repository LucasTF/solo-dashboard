import bcrypt
from typing import Dict

from email_validator import EmailNotValidError
from pydantic import ValidationError

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
        except ValidationError:
            return SerialResponse(
                message='Não foi possível criar o usuário.',
                details='Dados inválidos.'
                )
        except Exception as exc:
            print(exc)
            return SerialResponse(message='Não foi possível criar o usuário.')
    
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
