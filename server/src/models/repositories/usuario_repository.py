from typing import List
from sqlalchemy.orm.exc import NoResultFound

from src.database.connector import DBConnector
from src.models.entities.usuario import Usuario

class UsuarioRepository:

    def __init__(self, db_connector: DBConnector) -> None:
        self.__db_connector = db_connector

    def list_usuarios(self) -> List[Usuario]:
        with self.__db_connector as conn:
            try:
                usuarios = conn.session.query(Usuario).all()
                return usuarios
            except NoResultFound:
                return []