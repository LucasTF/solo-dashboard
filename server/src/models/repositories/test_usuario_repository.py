from src.database.connector import db_connector

from .usuario_repository import UsuarioRepository

db_connector.connect_to_db()

def test_list_usuarios():
    repo = UsuarioRepository(db_connector)
    response = repo.list_usuarios()
    print(response)