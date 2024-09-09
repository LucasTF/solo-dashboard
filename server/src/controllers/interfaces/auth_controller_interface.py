from abc import ABC, abstractmethod
from typing import Dict

class AuthControllerInterface(ABC):

    @abstractmethod
    def login(self, email: str, password: str) -> Dict:
        pass