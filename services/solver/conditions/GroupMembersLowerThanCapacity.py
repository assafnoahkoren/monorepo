from typing import Sequence

from constraint import Constraint
from constraint.domain import Unassigned


class GroupMembersLowerThanCapacity(Constraint):
    def __call__(self,
                 variables: Sequence,
                 domains: dict,
                 assignments: dict,
                 forwardcheck=False,
                 ):
        print("variables", variables)
        print("domains", domains)
        print("assignments", assignments)
        print("forwardcheck", forwardcheck)
        print("_unassigned", Unassigned)

        return True
