from typing import List

from sqlalchemy import insert, select
from src.database.connector import DBConnector
from src.errors.internal_processing_error import InternalProcessingError
from src.models.entities.cliente import Cliente
from src.models.interfaces.cliente_repository_interface import (
    ClienteRepositoryInterface,
)


class ClienteRepository(ClienteRepositoryInterface):
    def __init__(self, db_connector: DBConnector) -> None:
        self.__db_connector = db_connector

    def list_clientes(self) -> List[Cliente]:
        query = select(Cliente).order_by(Cliente.id)
        results: List[Cliente] = []
        with self.__db_connector as conn:
            for cliente in conn.session.scalars(query):
                results.append(cliente)

        return results

    def get_cliente_by_id(self, id: int) -> Cliente:
        query = select(Cliente).where(Cliente.id == id)
        with self.__db_connector as conn:
            cliente = conn.session.scalar(query)

        return cliente

    def search_clientes(self, search_string: str) -> List[Cliente]:
        query = select(Cliente).where(Cliente.nome.contains(search_string))
        results: List[Cliente] = []
        with self.__db_connector as conn:
            for cliente in conn.session.scalars(query):
                results.append(cliente)

        return results

    def insert_cliente(
        self,
        nome: str,
        apelido: str = None,
        cpf: str = None,
        cnpj: str = None,
        tipo_logo: str = None,
        logradouro: str = None,
        complemento: str = None,
        bairro: str = None,
        cidade: str = None,
        uf: str = None,
        cep: str = None,
        email: str = None,
        fone1: int = None,
        fone2: int = None,
    ):
        query = insert(Cliente).values(
            nome=nome,
            apelido=apelido,
            cpf=cpf,
            cnpj=cnpj,
            tipo_logo=tipo_logo,
            logradouro=logradouro,
            complemento=complemento,
            bairro=bairro,
            cidade=cidade,
            uf=uf,
            cep=cep,
            email=email,
            fone1=fone1,
            fone2=fone2,
        )

        with self.__db_connector as conn:
            try:
                conn.session.execute(query)
                conn.session.commit()
            except Exception:
                conn.session.rollback()
                raise InternalProcessingError
