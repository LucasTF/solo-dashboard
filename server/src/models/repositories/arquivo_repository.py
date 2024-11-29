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

    def register_arquivo(self, obra_id, arquivo_info) -> int:
        query = insert(Arquivo).values(
            obra_id=obra_id,
            nome=arquivo_info.get("nome"),
            formato=arquivo_info.get("formato"),
            tipo=arquivo_info.get("tipo"),
            criado_em=datetime.now().isoformat(),
            caminho=arquivo_info.get("caminho"),
        )

        with self.__db_connector as conn:
            try:
                result = conn.session.execute(query)
                inserted_id = result.inserted_primary_key[0]

                conn.session.commit()

                return inserted_id
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

    def find_arquivo_by_id(self, arquivo_id) -> Arquivo:
        query = select(Arquivo).where(Arquivo.id == arquivo_id)

        with self.__db_connector as conn:
            arquivo = conn.session.scalar(query)

        return arquivo

    def find_arquivos_by_obra_id(self, obra_id) -> List[Arquivo]:
        query = select(Arquivo).where(Arquivo.obra_id == obra_id)

        results: List[Arquivo] = []

        with self.__db_connector as conn:
            for arquivo in conn.session.scalars(query):
                results.append(arquivo)

        return results
