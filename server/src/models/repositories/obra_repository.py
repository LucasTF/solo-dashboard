from typing import List

from sqlalchemy import insert, select, text
from src.database.connector import DBConnector
from src.errors.internal_processing_error import InternalProcessingError
from src.errors.unavailable_resource_error import UnavailableResourceError
from src.models.entities.cliente import Cliente
from src.models.entities.obra import Obra
from src.models.interfaces.obra_repository_interface import ObraRepositoryInterface


class ObraRepository(ObraRepositoryInterface):

    def __init__(self, db_connector: DBConnector) -> None:
        self.__db_connector = db_connector

    def list_obras(self) -> List[Obra]:
        query = select(Obra).order_by(Obra.id)
        results : List[Obra] = []
        with self.__db_connector as conn:
            for obra in conn.session.scalars(query):
                results.append(obra)

        return results

    def get_obra_by_id(self, id: int) -> Obra | None:
        query = select(Obra).where(Obra.id == id)
        with self.__db_connector as conn:
            obra = conn.session.scalar(query)

        return obra

    def get_obra_by_cod(self, cod_obra: str) -> Obra | None:
        query = select(Obra).where(Obra.cod_obra == cod_obra)
        with self.__db_connector as conn:
            obra = conn.session.scalar(query)

        return obra

    def search_obra(self, search_string: str) -> List[Obra]:
        query = text("""SELECT ob.* 
                     FROM Obra ob 
                     INNER JOIN Cliente cl 
                     ON cliente_id = cl.id 
                     LEFT JOIN Cliente pr 
                     ON proprietario_id = pr.id 
                     WHERE CONCAT_WS(' ', ob.tipo_logo, ob.logradouro, ob.complemento) LIKE CONCAT('%', :search_string, '%') OR ob.cod_obra LIKE CONCAT('%', :search_string, '%') OR ob.cidade LIKE CONCAT('%', :search_string, '%') OR ob.bairro LIKE CONCAT('%', :search_string, '%') OR cl.nome LIKE CONCAT('%', :search_string, '%') OR pr.nome LIKE CONCAT('%', :search_string, '%') 
                     ORDER BY ob.ano DESC, ob.cod_obra DESC""")
        
        results : List[Obra] = []
        
        with self.__db_connector as conn:
            for obra in conn.session.scalars(query, {'search_string': search_string}):
                results.append(obra)

        return results

    def update_obra(self, id: int, ano: str = None, data_inicio: str = None, data_fim: str = None, tipo_logo: str = None, logradouro: str = None, lote: str = None, quadra: str = None, bairro: str = None, cidade: str = None, uf: str = None, cep: str = None, complemento: str = None, cliente_id: int = None, proprietario_id: int = None) -> None:
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
                if cliente_id is not None:
                    obra.cliente_id = cliente_id
                if proprietario_id is not None:
                    obra.proprietario_id = proprietario_id

                conn.session.commit()
            except UnavailableResourceError as exc:
                raise exc
            except Exception:
                conn.session.rollback()
                raise InternalProcessingError

    def insert_obra(self, cod_obra: str, num_obra: str, ano: str, data_inicio: str, data_fim: str, uf: str, cidade: str, bairro: str, logradouro: str, cliente: str, tipo_logo: str = None, lote: str = None, quadra: str = None, cep: str = None, complemento: str = None, proprietario: str = None) -> None:
        get_cliente_query = select(Cliente).where(Cliente.nome == cliente)
        
        with self.__db_connector as conn:
            try:
                found_cliente = conn.session.scalar(get_cliente_query)
                
                if found_cliente:
                    cliente_id = found_cliente.id
                else:
                    create_cliente_query = insert(Cliente).values(nome=cliente)
                    create_cliente_result = conn.session.execute(create_cliente_query)
                    cliente_id = create_cliente_result.inserted_primary_key[0]

                if proprietario:
                    get_proprietario_query = select(Cliente).where(Cliente.nome == proprietario)
                    found_proprietario = conn.session.scalar(get_proprietario_query)
                    if found_proprietario:
                        proprietario_id = found_proprietario.id
                    else:
                        create_proprietario_query = insert(Cliente).values(nome=proprietario)
                        create_proprietario_result = conn.session.execute(create_proprietario_query)
                        proprietario_id = create_proprietario_result.inserted_primary_key[0]

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
                    proprietario_id=proprietario_id
                )

                conn.session.execute(insert_obra_query)

                conn.session.commit()
            except Exception:
                conn.session.rollback()
                raise InternalProcessingError

