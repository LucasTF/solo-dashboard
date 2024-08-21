import unittest
import pytest
from src.database.connector import db_connector
from src.models.repositories.usuario_repository import UsuarioRepository

@pytest.mark.skip(reason="Tests directly into the real database.")
class IntegrationUsuarioRepositoryTestCase(unittest.TestCase):

    def setUp(self) -> None:
        self.db_connector.connect_to_db()
        self.repo = UsuarioRepository(db_connector)

    def test_repo_list_usuarios(self):
        usuarios = self.repo.list_usuarios()

        assert len(usuarios) == 1
        assert usuarios[0].name == "John Doe"