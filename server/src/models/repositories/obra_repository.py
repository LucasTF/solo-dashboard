from typing import List

from sqlalchemy import desc, func, insert, or_, select
from sqlalchemy.orm import aliased
from sqlalchemy.exc import NoResultFound
from src.database.connector import DBConnector
from src.errors.internal_processing_error import InternalProcessingError
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.entities.cliente import Cliente
from src.models.entities.obra import Obra
from src.models.interfaces.obra_repository_interface import ObraRepositoryInterface
from src.types.obra_response import ObraResponse


class ObraRepository(ObraRepositoryInterface):
    def __init__(self, db_connector: DBConnector) -> None:
        self.__db_connector = db_connector

    def list_obras(self) -> List[ObraResponse]:
        query = self.__select_obras()

        obras: List[ObraResponse] = []

        with self.__db_connector as conn:
            results = conn.session.execute(query).all()
            for result in results:
                row = result.tuple()
                obras.append(ObraResponse.serialize(row[0], row[1], row[2]))

        return obras

    def get_obra_by_id(self, id: int) -> ObraResponse | None:
        query = self.__select_obras().where(Obra.id == id)

        try:
            with self.__db_connector as conn:
                result = conn.session.execute(query).one()
                row = result.tuple()

                obra = ObraResponse.serialize(row[0], row[1], row[2])
        except NoResultFound:
            return None
        except Exception:
            raise InternalProcessingError

        return obra

    def get_obra_by_cod(self, cod_obra: str) -> ObraResponse | None:
        query = self.__select_obras().where(Obra.cod_obra == cod_obra)
        try:
            with self.__db_connector as conn:
                result = conn.session.execute(query).one()
                row = result.tuple()

                obra = ObraResponse.serialize(row[0], row[1], row[2])
        except NoResultFound:
            return None
        except Exception:
            raise InternalProcessingError

        return obra

    def search_obras(self, search_string: str) -> List[ObraResponse]:
        Proprietario = aliased(Cliente)
        test_query = (
            select(Obra, Cliente.nome, Proprietario.nome)
            .join(Cliente, Obra.cliente_id == Cliente.id)
            .join(Proprietario, Obra.proprietario_id == Proprietario.id, isouter=True)
            .where(
                or_(
                    func.CONCAT_WS(
                        " ", Obra.tipo_logo, Obra.logradouro, Obra.complemento
                    ).like("%" + search_string + "%"),
                    Obra.cod_obra.like("%" + search_string + "%"),
                    Obra.cidade.like("%" + search_string + "%"),
                    Obra.bairro.like("%" + search_string + "%"),
                    Cliente.nome.like("%" + search_string + "%"),
                    Proprietario.nome.like("%" + search_string + "%"),
                )
            )
            .order_by(desc(Obra.ano), desc(Obra.cod_obra))
        )

        obras: List[ObraResponse] = []

        with self.__db_connector as conn:
            results = conn.session.execute(test_query).all()
            for result in results:
                row = result.tuple()
                obras.append(ObraResponse.serialize(row[0], row[1], row[2]))

        return obras

    def update_obra(
        self,
        id: int,
        ano: str = None,
        data_inicio: str = None,
        data_fim: str = None,
        tipo_logo: str = None,
        logradouro: str = None,
        lote: str = None,
        quadra: str = None,
        bairro: str = None,
        cidade: str = None,
        uf: str = None,
        cep: str = None,
        complemento: str = None,
        cliente: str = None,
        proprietario: str = None,
    ) -> None:
        query = select(Obra).where(Obra.id == id)
        with self.__db_connector as conn:
            try:
                obra = conn.session.scalar(query)

                if not obra:
                    raise UnavailableResourceError("Obra")

                if ano is not None:
                    obra.ano = ano
                if data_inicio is not None:
                    obra.data_inicio = data_inicio
                if data_fim is not None:
                    obra.data_fim = data_fim
                if tipo_logo is not None:
                    obra.tipo_logo = tipo_logo
                if logradouro is not None:
                    obra.logradouro = logradouro
                if lote is not None:
                    obra.lote = lote
                if quadra is not None:
                    obra.quadra = quadra
                if bairro is not None:
                    obra.bairro = bairro
                if cidade is not None:
                    obra.cidade = cidade
                if uf is not None:
                    obra.uf = uf
                if cep is not None:
                    obra.cep = cep
                if complemento is not None:
                    obra.complemento = complemento
                if cliente is not None:
                    obra.cliente_id = self.__process_cliente_id(conn, cliente)
                if proprietario is not None:
                    obra.proprietario_id = self.__process_cliente_id(conn, proprietario)

                conn.session.commit()
            except UnavailableResourceError as exc:
                raise exc
            except Exception:
                conn.session.rollback()
                raise InternalProcessingError

    def insert_obra(
        self,
        cod_obra: str,
        num_obra: str,
        ano: str,
        data_inicio: str,
        data_fim: str,
        uf: str,
        cidade: str,
        bairro: str,
        logradouro: str,
        cliente: str,
        tipo_logo: str = None,
        lote: str = None,
        quadra: str = None,
        cep: str = None,
        complemento: str = None,
        proprietario: str = None,
    ) -> None:
        with self.__db_connector as conn:
            try:
                cliente_id = self.__process_cliente_id(conn, cliente)
                proprietario_id = None

                if proprietario:
                    proprietario_id = self.__process_cliente_id(conn, proprietario)

                insert_obra_query = insert(Obra).values(
                    cod_obra=cod_obra,
                    num_obra=num_obra,
                    ano=ano,
                    data_inicio=data_inicio,
                    data_fim=data_fim,
                    uf=uf,
                    cidade=cidade,
                    bairro=bairro,
                    logradouro=logradouro,
                    tipo_logo=tipo_logo,
                    lote=lote,
                    quadra=quadra,
                    cep=cep,
                    complemento=complemento,
                    cliente_id=cliente_id,
                    proprietario_id=proprietario_id,
                )

                conn.session.execute(insert_obra_query)

                conn.session.commit()
            except Exception:
                conn.session.rollback()
                raise InternalProcessingError

    def __select_obras(self):
        Proprietario = aliased(Cliente)
        query = (
            select(Obra, Cliente.nome, Proprietario.nome)
            .join(Cliente, Obra.cliente_id == Cliente.id)
            .join(Proprietario, Obra.proprietario_id == Proprietario.id, isouter=True)
            .order_by(Obra.id)
        )

        return query

    def __process_cliente_id(self, conn: DBConnector, cliente: str) -> int:
        get_cliente_query = select(Cliente).where(Cliente.nome == cliente)

        found_cliente = conn.session.scalar(get_cliente_query)

        if found_cliente:
            return found_cliente.id
        else:
            create_cliente_query = insert(Cliente).values(nome=cliente)
            create_cliente_result = conn.session.execute(create_cliente_query)
            return create_cliente_result.inserted_primary_key[0]
