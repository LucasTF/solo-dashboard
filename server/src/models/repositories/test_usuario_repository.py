from unittest import mock, TestCase
from unittest.mock import Mock

from src.database.connector import DBConnector
from src.models.entities.usuario import Usuario
from .usuario_repository import UsuarioRepository


class MockConnector(DBConnector):
    def __init__(self) -> None:
        self.session = Mock()
        self.session.scalars.return_value = [
            Usuario(
                id=1,
                name="John Doe",
                email="test@test.com",
                password="123456",
                is_admin=1,
            ),
            Usuario(
                id=2,
                name="Jane Doe",
                email="test2@test.com",
                password="123456",
                is_admin=0,
            ),
        ]

    def __enter__(self):
        return self

    def __exit__(self, *args):
        pass


class UsuarioRepositoryTestCase(TestCase):
    def setUp(self) -> None:
        self.mock_connector = MockConnector()
        self.__repo = UsuarioRepository(self.mock_connector)

    @mock.patch("src.models.repositories.usuario_repository.select")
    def test_list_usuarios(self, mock_select):
        usuarios = self.__repo.list_usuarios()

        mock_select.assert_called_once_with(Usuario)

        self.mock_connector.session.scalars.assert_called_once()

        self.assertEqual(len(usuarios), 2)
        self.assertEqual(usuarios[0].name, "John Doe")

    @mock.patch("src.models.repositories.usuario_repository.delete")
    def test_delete_usuario(self, mock_delete):
        self.__repo.delete_usuario(1)

        mock_delete.assert_called_once_with(Usuario)

        self.mock_connector.session.execute.assert_called_once()
        self.mock_connector.session.commit.assert_called_once()

    @mock.patch("src.models.repositories.usuario_repository.insert")
    def test_insert_usuario(self, mock_insert):
        self.__repo.insert_usuario("Test User", "test3@test.com", "123456", False)

        mock_insert.assert_called_once_with(Usuario)

        self.mock_connector.session.execute.assert_called_once()
        self.mock_connector.session.commit.assert_called_once()
