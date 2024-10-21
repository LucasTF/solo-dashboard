from sqlalchemy import insert, select
from src.database.connector import DBConnector
from src.models.entities.sondagem_percussao import SondagemPercussao
from src.types.sondagem_types import SondagemPercussaoType


class ObraSondagemService:
    def __init__(self, db_connector: DBConnector) -> None:
        self.__conn = db_connector

    def manage_sondagem_percussao(
        self, obra_id: int, sondagem_info: SondagemPercussaoType = None
    ):
        get_sondagem_query = select(SondagemPercussao).where(
            SondagemPercussao.obra_id == obra_id
        )

        found_sondagem = self.__conn.session.scalar(get_sondagem_query)

        if found_sondagem:
            if sondagem_info is None:
                delete_sondagem_query = delete(SondagemPercussao).where(
                    SondagemPercussao.id == found_sondagem.id
                )
                self.__conn.session.execute(delete_sondagem_query)
            else:
                found_sondagem.sondagens = sondagem_info.get("sondagens")
                found_sondagem.metros = sondagem_info.get("metros")
            return

        if sondagem_info:
            create_sondagem_query = insert(SondagemPercussao).values(
                obra_id=obra_id, **sondagem_info
            )
            self.__conn.session.execute(create_sondagem_query)
