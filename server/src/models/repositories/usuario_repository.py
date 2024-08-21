from typing import List
from sqlalchemy import delete, insert, select

from src.database.connector import DBConnector
from src.models.entities.usuario import Usuario

class UsuarioRepository:

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

        return usuario
    
    def get_usuario_by_email(self, email: str) -> Usuario:
        query = select(Usuario).where(Usuario.email == email)
        with self.__db_connector as conn:
            usuario = conn.session.scalar(query)

        return usuario
            
    def delete_usuario(self, id: int) -> None:
        query = delete(Usuario).where(Usuario.id == id)
        with self.__db_connector as conn:
            try:
                conn.session.execute(query)
                conn.session.commit()
            except Exception as exc:
                conn.session.rollback()
                raise exc

    def insert_usuario(self, name: str, email: str, password: str, is_admin: bool = False) -> None:
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