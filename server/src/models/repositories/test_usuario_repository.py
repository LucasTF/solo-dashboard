import pytest
from unittest import mock
from mock_alchemy.mocking import UnifiedAlchemyMagicMock
from sqlalchemy.orm.exc import NoResultFound

from src.database.connector import DBConnector
from src.models.entities.usuario import Usuario
from .usuario_repository import UsuarioRepository

class MockConnector(DBConnector):

    def __init__(self) -> None:
        self.session = UnifiedAlchemyMagicMock(
            data=[
                (
                    [mock.call.query(Usuario)],
                    [
                        Usuario(id=1, name="John Doe", email="test@test.com", password="123456", is_admin=1),
                        Usuario(id=2, name="Jane Doe", email="test2@test.com", password="123456", is_admin=0)
                    ]
                )
            ]
        )

    def __enter__(self):
        return self
    
    def __exit__(self, *args):
        pass

class MockConnectorNoResult(DBConnector):

    def __init__(self) -> None:
        self.session = UnifiedAlchemyMagicMock()
        self.session.query.side_effect = self.__raise_no_result_found

    def __raise_no_result_found(self, *args, **kwargs):
        raise NoResultFound("No result found")

    def __enter__(self):
        return self
    
    def __exit__(self, *args):
        pass

def test_list_usuarios():
    mock_connector = MockConnector()
    repo = UsuarioRepository(mock_connector)
    response = repo.list_usuarios()

    mock_connector.session.query.assert_called_once_with(Usuario)
    mock_connector.session.all.assert_called_once()

    assert response[0].name == "John Doe"
    assert response[1].name == "Jane Doe"

def test_list_usuarios_no_result():
    mock_connector = MockConnectorNoResult()
    repo = UsuarioRepository(mock_connector)
    response = repo.list_usuarios()

    mock_connector.session.query.assert_called_once_with(Usuario)
    mock_connector.session.all.assert_not_called()

    assert response == []

def test_delete_usuario():
    mock_connector = MockConnector()
    repo = UsuarioRepository(mock_connector)
    repo.delete_usuario(1)

    mock_connector.session.query.assert_called_once_with(Usuario)
    mock_connector.session.filter.assert_called_once_with(Usuario.id == 1)
    mock_connector.session.delete.assert_called_once()

def test_delete_usuario_error():
    mock_connector = MockConnectorNoResult()
    repo = UsuarioRepository(mock_connector)

    with pytest.raises(Exception):
        repo.delete_usuario(1)

    mock_connector.session.rollback.assert_called_once()

