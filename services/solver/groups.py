from typing import List

from pydantic import BaseModel


class Group(BaseModel):
    id: str
    name: str
    memberCount: int

groups: List[Group] = [
    Group(id="1", name="אשכול א1", memberCount=280),
    Group(id="2", name="אשכול א2", memberCount=433),
    Group(id="3", name="אשכול א3", memberCount=380),
    Group(id="4", name="אשכול א4", memberCount=386),
    Group(id="5", name="אשכול א5", memberCount=309),
    Group(id="6", name="אשכול א6", memberCount=429),
    Group(id="7", name="אשכול א7", memberCount=204),
    Group(id="8", name="אשכול ב1", memberCount=267),
    Group(id="9", name="אשכול ב2", memberCount=276),
    Group(id="10", name="אשכול ב3", memberCount=393),
    Group(id="11", name="אשכול ב4", memberCount=412),
    Group(id="12", name="אשכול ב5", memberCount=1211),
    Group(id="13", name="אשכול ג6", memberCount=1540),
    Group(id="14", name="אשכול ג1", memberCount=268),
    Group(id="15", name="אשכול ג2", memberCount=106),
    Group(id="16", name="אשכול ג3", memberCount=118),
    Group(id="17", name="אשכול ג4", memberCount=181),
    Group(id="18", name="אשכול ד1", memberCount=372),
    Group(id="19", name="אשכול ד2", memberCount=225),
    Group(id="20", name="אשכול ד3", memberCount=454),
    Group(id="21", name="אשכול ד4", memberCount=296),
    Group(id="22", name="אשכול ד5", memberCount=580),
    Group(id="23", name="אשכול ז1", memberCount=78),
    Group(id="24", name="אשכול ז2", memberCount=237),
    Group(id="25", name="אשכול ז3", memberCount=390),
    Group(id="26", name="אשכול ז4", memberCount=310),
    Group(id="27", name="אשכול ז5", memberCount=496),
    Group(id="28", name="אשכול א8", memberCount=82),
    Group(id="29", name="אשכול א9", memberCount=10),
    Group(id="30", name="אשכול ב6", memberCount=227),
    Group(id="31", name="אשכול ב7", memberCount=340),
    Group(id="32", name="אשכול ב8", memberCount=217),
    Group(id="33", name="אשכול ב9", memberCount=203),
    Group(id="34", name="אשכול ג5", memberCount=221),
    Group(id="35", name="אשכול ג8", memberCount=393),
    Group(id="36", name="אשכול ג7", memberCount=367),
    Group(id="37", name="אשכול ד6", memberCount=930),
    Group(id="38", name="אשכול ד7", memberCount=359),
    Group(id="39", name="אשכול ד8", memberCount=457),
    Group(id="40", name="אשכול ד9", memberCount=401),
    Group(id="41", name="אשכול ד10", memberCount=230),
    Group(id="42", name="אשכול ה1", memberCount=143),
    Group(id="43", name="אשכול ה2", memberCount=165),
    Group(id="44", name="אשכול ה3", memberCount=237),
    Group(id="45", name="אשכול ה4", memberCount=222)

]
