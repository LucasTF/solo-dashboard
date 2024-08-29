from typing import List
from sqlalchemy import delete, insert, or_, select

from src.database.connector import DBConnector
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.entities.usuario import Usuario
from src.models.interfaces.usuario_repository_interface import UsuarioRepositoryInterface

class UsuarioRepository(UsuarioRepositoryInterface):

    def __init__(self, db_connector: DBConnector) -> None:
        self.__db_connector = db_connector

    def list_usuarios(self) -> List[Usuario]:
        query = select(Usuario).order_by(Usuario.id)
        results : List[Usuario] = []
        with self.__db_connector as conn:
            for usuario in conn.session.scalars(query):
                results.append(usuario)
            
        return results
    
    def get_usuario_by_id(self, id: int) -> Usuario:
        query = select(Usuario).where(Usuario.id == id)
        with self.__db_connector as conn:
            usuario = conn.session.scalar(query)

        if not usuario:
            raise UnavailableResourceError("Usuário")

        return usuario
    
    def get_usuario_by_email(self, email: str) -> Usuario:
        query = select(Usuario).where(Usuario.email == email)
        with self.__db_connector as conn:
            usuario = conn.session.scalar(query)

        if not usuario:
            raise UnavailableResourceError("Usuário")

        return usuario
    
    def search_usuarios(self, search_string: str) -> List[Usuario]:
        query = select(Usuario).where(
            or_(
                Usuario.email.contains(search_string), 
                Usuario.name.contains(search_string)
                )
            )
        results : List[Usuario] = []
        with self.__db_connector as conn:
            for usuario in conn.session.scalars(query):
                results.append(usuario)

        return results
            
    def delete_usuario(self, id: int) -> None:
        query = delete(Usuario).where(Usuario.id == id)
        with self.__db_connector as conn:
            try:
                conn.session.execute(query)
                conn.session.commit()
            except Exception as exc:
                conn.session.rollback()
                raise exc
            
    def update_usuario(self, id: int, name: str = None, email: str = None, is_admin: bool = None) -> None:
        query = select(Usuario).where(Usuario.id == id)
        with self.__db_connector as conn:
            try:
                usuario = conn.session.scalar(query)

                if not usuario:
                    raise UnavailableResourceError("Usuário")
                
                if name is not None:
                    usuario.name = name
                if email is not None:
                    usuario.email = email
                if is_admin is not None:
                    usuario.is_admin = is_admin
                    
                conn.session.commit()
            except UnavailableResourceError as exc:
                raise exc
            except Exception:
                conn.session.rollback()
                raise Exception

    def update_usuario_password(self, id: int, new_password: bytes) -> None:
        query = select(Usuario).where(Usuario.id == id)
        with self.__db_connector as conn:
            try:
                usuario = conn.session.scalar(query)

                if not usuario:
                    raise UnavailableResourceError("Usuário")

                usuario.password = new_password
                conn.session.commit()
            except UnavailableResourceError as exc:
                raise exc
            except Exception as exc:
                conn.session.rollback()
                raise exc

    def insert_usuario(self, name: str, email: str, password: bytes, is_admin: bool = False) -> None:
        query = insert(Usuario).values(
            name=name, 
            email=email, 
            password=password, 
            is_admin=is_admin
            )
        
        with self.__db_connector as conn:
            try:
                conn.session.execute(query)
                conn.session.commit()
            except Exception as exc:
                conn.session.rollback()
                raise exc