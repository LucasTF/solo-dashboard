import unittest
import pytest
from src.database.connector import db_connector
from src.models.repositories.obra_repository import ObraRepository
from src.models.repositories.usuario_repository import UsuarioRepository

# Personal test cases for usage with specific setup database
# Should not be run as legitimate tests

@pytest.mark.skip(reason="Tests directly into the real database.")
class IntegrationUsuarioRepositoryTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.db_connector = db_connector
        self.db_connector.connect_to_db()
        self.__usuario_repo = UsuarioRepository(self.db_connector)
        self.__obra_repo = ObraRepository(self.db_connector)

    # Obras

    def test_repo_search_obras(self):
        obras = self.__obra_repo.search_obra("Rua Professor")

        self.assertEqual(len(obras), 2)

    # Usuarios

    def test_repo_list_usuarios(self):
        usuarios = self.__usuario_repo.list_usuarios()

        self.assertEqual(usuarios[0].name, "John Doe")

    def test_repo_insert_usuario(self):
        num_usuarios = len(self.__usuario_repo.list_usuarios())

        self.__usuario_repo.insert_usuario('Jane Doe', 'jane@doe.com', '123456', False)

        num_usuarios_new = len(self.__usuario_repo.list_usuarios())

        self.assertNotEqual(num_usuarios, num_usuarios_new)
        self.assertEqual(num_usuarios + 1, num_usuarios_new)

    def test_repo_search_usuarios(self):
        usuarios = self.__usuario_repo.search_usuarios('Doe')

        self.assertEqual(len(usuarios), 2)

        usuarios = self.__usuario_repo.search_usuarios('teste@')

        self.assertEqual(len(usuarios), 1)
        self.assertEqual(usuarios[0].name, 'John Doe')

    def test_update_usuario_password(self):

        new_password = 'newpassword'

        self.__usuario_repo.update_usuario_password(1, str.encode(new_password))

        usuario = self.__usuario_repo.get_usuario_by_id(1)

        self.assertEqual(usuario.password, new_password)