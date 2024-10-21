from sqlalchemy import insert, select
from src.database.connector import DBConnector
from src.models.entities.cliente import Cliente


class ObraClienteService:
    def __init__(self, db_connector: DBConnector) -> None:
        self.__conn = db_connector

    def create_associated_cliente(self, cliente_name: str) -> int:
        get_cliente_query = select(Cliente).where(Cliente.nome == cliente_name)

        found_cliente = self.__conn.session.scalar(get_cliente_query)

        if found_cliente:
            return found_cliente.id
        else:
            create_cliente_query = insert(Cliente).values(nome=cliente_name)
            create_cliente_result = self.__conn.session.execute(create_cliente_query)
            return create_cliente_result.inserted_primary_key[0]
