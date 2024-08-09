from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

from sqlalchemy import create_engine

class DBConnector:
    def __init__(self) -> None:

        load_dotenv()

        self.__conection_string = os.getenv("DATABASE_CONN_STRING")
        self.__engine = None
        self.session = None

    def connect_to_db(self):
        self.__engine = create_engine(self.__conection_string)

    def get_engine(self):
        return self.__engine
    
    def __enter__(self):
        session_maker = sessionmaker()
        self.session = session_maker(bind=self.__engine)

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.session.close()
    
db_connector = DBConnector()