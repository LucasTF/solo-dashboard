import pytest

from src.config.environment import files_env
from src.utils.path_builder import PathBuilder


@pytest.fixture
def setup():
    directories = ["2024", "SP001/24", "Plantas"]

    path_builder = PathBuilder(directories, "SP001-24-Model.pdf")

    yield path_builder

def test_path_builder(setup):
    path = setup.build_path()

    assert path == files_env.get("UPLOADED_FILES_PATH") + "/" + "2024/SP001-24/Plantas/SP001-24-Model.pdf"

    path = setup.build_path(False)

    assert path == "2024/SP001-24/Plantas/SP001-24-Model.pdf"

    path = setup.build_path(True, False)

    assert path == "/srv/http/sondagens/2024/SP001-24/Plantas"

    path = setup.build_path(False, False)

    assert path == "2024/SP001-24/Plantas"


