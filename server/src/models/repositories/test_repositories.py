import unittest
import pytest
from src.database.connector import db_connector
from src.models.repositories.usuario_repository import UsuarioRepository

# Personal test cases for usage with specific setup database
# Should not be run as legitimate tests

@pytest.mark.skip(reason="Tests directly into the real database.")
class IntegrationUsuarioRepositoryTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.db_connector = db_connector
        self.db_connector.connect_to_db()
        self.repo = UsuarioRepository(self.db_connector)

    def test_repo_list_usuarios(self):
        usuarios = self.repo.list_usuarios()

        self.assertEqual(usuarios[0].name, "John Doe")

    @pytest.mark.dependency(depends=['test_repo_list_usuarios'])
    def test_repo_insert_usuario(self):
        num_usuarios = len(self.repo.list_usuarios())

        self.repo.insert_usuario('Jane Doe', 'jane@doe.com', '123456', False)

        num_usuarios_new = len(self.repo.list_usuarios())

        self.assertNotEqual(num_usuarios, num_usuarios_new)
        self.assertEqual(num_usuarios + 1, num_usuarios_new)

    def test_repo_search_usuarios(self):
        usuarios = self.repo.search_usuarios('Doe')

        self.assertEqual(len(usuarios), 2)

        usuarios = self.repo.search_usuarios('teste@')

        self.assertEqual(len(usuarios), 1)
        self.assertEqual(usuarios[0].name, 'John Doe')
