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
            
    def delete_usuario(self, id: int) -> None:
        with self.__db_connector as conn:
            try:
                (
                    conn.session
                        .query(Usuario)
                        .filter(Usuario.id == id)
                        .delete()
                )
                conn.session.commit()
            except Exception as exc:
                conn.session.rollback()
                raise exc

