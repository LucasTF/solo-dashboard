from typing import List
from sqlalchemy import delete, select

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
            
    def delete_usuario(self, id: int) -> None:
        query = delete(Usuario).where(Usuario.id == id)
        with self.__db_connector as conn:
            conn.session.execute(query)

