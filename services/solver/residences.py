from typing import List

from pydantic import BaseModel

class Residence(BaseModel):
    id: str
    name: str
    memberCapacity: int

residences: List[Residence] = [
    Residence(id='1', name="Leonardo Hotel", memberCapacity=150),
    Residence(id='2', name="Dona Maria Hotel", memberCapacity=200),
    Residence(id='3', name="Hotel de la Plaza", memberCapacity=250),
    Residence(id='4', name="Grand Hotel", memberCapacity=300),
    Residence(id='5', name="San Francisco Hotel", memberCapacity=350),
]