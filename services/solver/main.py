# from constraint import *
#
# from conditions.GroupMembersLowerThanCapacity import GroupMembersLowerThanCapacity
# from groups import groups
# from residences import residences
#
# problem = Problem()
# for group in groups:
#     problem.addVariable(group.name, [residence.name for residence in residences])
# problem.addConstraint(GroupMembersLowerThanCapacity())
# problem.addConstraint(AllDifferentConstraint())
# s = problem.getSolutions()
# print(s)
# print(groups[0].name)
# print(groups[1].name)
# print(residences[0].name)
# print(residences[1].name)
