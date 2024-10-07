import pytest


def pytest_addoption(parser):
    parser.addoption("--rundb", action="store_true", help="run database tests")


def pytest_collection_modifyitems(config, items):
    if config.getoption("--rundb"):
        # If the --rundb flag is set, we keep all tests
        return

    skip_dbtest = pytest.mark.skip(reason="need --rundb option to run database tests")
    for item in items:
        if "dbtest" in item.keywords:
            item.add_marker(skip_dbtest)
