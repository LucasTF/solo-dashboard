from dataclasses import dataclass
from datetime import datetime
from typing import Dict


@dataclass
class ArquivoResponse:
    id: int
    obra_id: int
    criado_em: datetime
    tipo: str
    link: str

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "obra_id": self.obra_id,
            "criado_em": self.criado_em.isoformat(),
            "tipo": self.tipo,
            "link": self.link,
        }
