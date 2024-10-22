from typing import List

from sqlalchemy import desc, func, insert, or_, select
from sqlalchemy.orm import aliased
from sqlalchemy.exc import NoResultFound
from src.database.connector import DBConnector
from src.errors.internal_processing_error import InternalProcessingError
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.entities.cliente import Cliente
from src.models.entities.obra import Obra
from src.models.entities.sondagem_percussao import SondagemPercussao
from src.models.entities.sondagem_rotativa import SondagemRotativa
from src.models.entities.sondagem_trado import SondagemTrado
from src.models.interfaces.obra_repository_interface import ObraRepositoryInterface
from src.services.repositories.obra.cliente_service import ObraClienteService
from src.services.repositories.obra.sondagem_service import ObraSondagemService
from src.types.obra_response import ObraResponse
from src.types.obra_types import ObraEditType, ObraInsertType


class ObraRepository(ObraRepositoryInterface):
    def __init__(self, db_connector: DBConnector) -> None:
        self.__db_connector = db_connector
        self.__sondagem_service = ObraSondagemService(db_connector)
        self.__cliente_service = ObraClienteService(db_connector)

    def list_obras(self) -> List[ObraResponse]:
        query = self.__select_obras()

        obras: List[ObraResponse] = []

        with self.__db_connector as conn:
            results = conn.session.execute(query).all()
            for result in results:
                obra, cliente, proprietario, son_percussao, son_trado, son_rotativa = (
                    result.tuple()
                )
                obras.append(
                    ObraResponse.serialize(
                        obra,
                        cliente,
                        proprietario,
                        son_percussao,
                        son_trado,
                        son_rotativa,
                    )
                )

        return obras

    def get_obra_by_id(self, id: int) -> ObraResponse | None:
        query = self.__select_obras().where(Obra.id == id)

        try:
            with self.__db_connector as conn:
                obra, cliente, proprietario, son_percussao, son_trado, son_rotativa = (
                    conn.session.execute(query).one().tuple()
                )

                response = ObraResponse.serialize(
                    obra,
                    cliente,
                    proprietario,
                    son_percussao,
                    son_trado,
                    son_rotativa,
                )
        except NoResultFound:
            return None
        except Exception:
            raise InternalProcessingError

        return response

    def get_obra_by_cod(self, cod_obra: str) -> ObraResponse | None:
        query = self.__select_obras().where(Obra.cod_obra == cod_obra)
        try:
            with self.__db_connector as conn:
                obra, cliente, proprietario, son_percussao, son_trado, son_rotativa = (
                    conn.session.execute(query).one().tuple()
                )

                response = ObraResponse.serialize(
                    obra,
                    cliente,
                    proprietario,
                    son_percussao,
                    son_trado,
                    son_rotativa,
                )
        except NoResultFound:
            return None
        except Exception:
            raise InternalProcessingError

        return response

    def search_obras(self, search_string: str) -> List[ObraResponse]:
        Proprietario = aliased(Cliente)
        test_query = (
            select(
                Obra,
                Cliente.nome,
                Proprietario.nome,
                SondagemPercussao,
                SondagemTrado,
                SondagemRotativa,
            )
            .join(Cliente, Obra.cliente_id == Cliente.id)
            .join(Proprietario, Obra.proprietario_id == Proprietario.id, isouter=True)
            .join(SondagemPercussao, Obra.id == SondagemPercussao.obra_id, isouter=True)
            .join(SondagemTrado, Obra.id == SondagemTrado.obra_id, isouter=True)
            .join(SondagemRotativa, Obra.id == SondagemRotativa.obra_id, isouter=True)
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
                obra, cliente, proprietario, son_percussao, son_trado, son_rotativa = (
                    result.tuple()
                )
                obras.append(
                    ObraResponse.serialize(
                        obra,
                        cliente,
                        proprietario,
                        son_percussao,
                        son_trado,
                        son_rotativa,
                    )
                )

        return obras

    def update_obra(self, id: int, update_info: ObraEditType) -> None:
        query = select(Obra).where(Obra.id == id)
        with self.__db_connector as conn:
            try:
                obra = conn.session.scalar(query)

                if not obra:
                    raise UnavailableResourceError("Obra")

                if update_info.get("cod_obra") is not None:
                    obra.cod_obra = update_info.get("cod_obra")
                if update_info.get("num_obra") is not None:
                    obra.num_obra = update_info.get("num_obra")
                if update_info.get("ano") is not None:
                    obra.ano = update_info.get("ano")
                if update_info.get("data_inicio") is not None:
                    obra.data_inicio = update_info.get("data_inicio")
                if update_info.get("data_fim") is not None:
                    obra.data_fim = update_info.get("data_fim")
                if update_info.get("tipo_logo") is not None:
                    obra.tipo_logo = update_info.get("tipo_logo")
                if update_info.get("logradouro") is not None:
                    obra.logradouro = update_info.get("logradouro")
                if update_info.get("lote") is not None:
                    obra.lote = update_info.get("lote")
                if update_info.get("quadra") is not None:
                    obra.quadra = update_info.get("quadra")
                if update_info.get("bairro") is not None:
                    obra.bairro = update_info.get("bairro")
                if update_info.get("cidade") is not None:
                    obra.cidade = update_info.get("cidade")
                if update_info.get("uf") is not None:
                    obra.uf = update_info.get("uf")
                if update_info.get("cep") is not None:
                    obra.cep = update_info.get("cep")
                if update_info.get("complemento") is not None:
                    obra.complemento = update_info.get("complemento")
                if update_info.get("cliente") is not None:
                    obra.cliente_id = self.__cliente_service.create_associated_cliente(
                        update_info["cliente"]
                    )
                if update_info.get("proprietario") is not None:
                    obra.proprietario_id = (
                        self.__cliente_service.create_associated_cliente(
                            update_info["proprietario"]
                        )
                    )

                self.__sondagem_service.manage_sondagem_percussao(
                    id, update_info.get("sondagem_percussao")
                )
                self.__sondagem_service.manage_sondagem_trado(
                    id, update_info.get("sondagem_trado")
                )
                self.__sondagem_service.manage_sondagem_rotativa(
                    id, update_info.get("sondagem_rotativa")
                )

                conn.session.commit()
            except UnavailableResourceError as exc:
                raise exc
            except Exception:
                conn.session.rollback()
                raise InternalProcessingError

    def insert_obra(self, obra_info: ObraInsertType) -> None:
        with self.__db_connector as conn:
            try:
                cliente_id = self.__cliente_service.create_associated_cliente(
                    obra_info.get("cliente")
                )
                proprietario_id = None

                if obra_info.get("proprietario") is not None:
                    proprietario_id = self.__cliente_service.create_associated_cliente(
                        obra_info["proprietario"]
                    )

                insert_obra_query = insert(Obra).values(
                    cod_obra=obra_info.get("cod_obra"),
                    num_obra=obra_info.get("num_obra"),
                    ano=obra_info.get("ano"),
                    data_inicio=obra_info.get("data_inicio"),
                    data_fim=obra_info.get("data_fim"),
                    uf=obra_info.get("uf"),
                    cidade=obra_info.get("cidade"),
                    bairro=obra_info.get("bairro"),
                    logradouro=obra_info.get("logradouro"),
                    tipo_logo=obra_info.get("tipo_logo"),
                    lote=obra_info.get("lote"),
                    quadra=obra_info.get("quadra"),
                    cep=obra_info.get("cep"),
                    complemento=obra_info.get("complemento"),
                    cliente_id=cliente_id,
                    proprietario_id=proprietario_id,
                )

                result = conn.session.execute(insert_obra_query)
                inserted_id = result.inserted_primary_key[0]

                self.__sondagem_service.manage_sondagem_percussao(
                    inserted_id, obra_info.get("sondagem_percussao")
                )
                self.__sondagem_service.manage_sondagem_trado(
                    inserted_id, obra_info.get("sondagem_trado")
                )
                self.__sondagem_service.manage_sondagem_rotativa(
                    inserted_id, obra_info.get("sondagem_rotativa")
                )

                conn.session.commit()
            except Exception:
                conn.session.rollback()
                raise InternalProcessingError

    def __select_obras(self):
        Proprietario = aliased(Cliente)
        query = (
            select(
                Obra,
                Cliente.nome,
                Proprietario.nome,
                SondagemPercussao,
                SondagemTrado,
                SondagemRotativa,
            )
            .join(Cliente, Obra.cliente_id == Cliente.id)
            .join(Proprietario, Obra.proprietario_id == Proprietario.id, isouter=True)
            .join(
                SondagemPercussao,
                Obra.id == SondagemPercussao.obra_id,
                isouter=True,
            )
            .join(SondagemTrado, Obra.id == SondagemTrado.id, isouter=True)
            .join(
                SondagemRotativa,
                Obra.id == SondagemRotativa.obra_id,
                isouter=True,
            )
            .order_by(Obra.id)
        )

        return query
