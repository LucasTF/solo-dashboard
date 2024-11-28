from datetime import datetime
from typing import List

from sqlalchemy import delete, insert, select
from src.database.connector import DBConnector
from src.errors.internal_processing_error import InternalProcessingError
from src.models.entities.arquivo import Arquivo
from src.models.interfaces.arquivo_repository_interface import (
    ArquivoRepositoryInterface,
)


class ArquivoRepository(ArquivoRepositoryInterface):
    def __init__(self, db_connector: DBConnector) -> None:
        self.__db_connector = db_connector

    def list_latest_arquivos(self, num_of_arquivos: int = 5) -> List[Arquivo]:
        if num_of_arquivos <= 0:
            return []

        query = select(Arquivo).order_by(Arquivo.criado_em).limit(num_of_arquivos)

        arquivos: List[Arquivo] = []

        with self.__db_connector as conn:
            for result in conn.session.scalars(query):
                arquivos.append(result)

        return arquivos

    def register_arquivo(
        self,
        obra_id: int,
        arquivo_name: str,
        arquivo_format: str,
        arquivo_type: str,
        arquivo_creation_time: datetime | str,
        arquivo_path: str,
    ) -> Arquivo:
        query = insert(Arquivo).values(
            obra_id=obra_id,
            nome=arquivo_name,
            formato=arquivo_format,
            tipo=arquivo_type,
            criado_em=arquivo_creation_time,
            caminho=arquivo_path,
        )

        with self.__db_connector as conn:
            try:
                conn.session.execute(query)
                conn.session.commit()
            except Exception:
                conn.session.rollback()
                raise InternalProcessingError

    def delete_arquivo(self, arquivo_id: int) -> None:
        query = delete(Arquivo).where(Arquivo.id == arquivo_id)

        with self.__db_connector as conn:
            try:
                conn.session.execute(query)
                conn.session.commit()
            except Exception:
                conn.session.rollback()
                raise InternalProcessingError
