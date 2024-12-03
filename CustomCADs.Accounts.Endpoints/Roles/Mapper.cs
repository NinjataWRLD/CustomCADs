﻿using CustomCADs.Accounts.Application.Roles.Queries;
using CustomCADs.Accounts.Endpoints.Helpers.Dtos;

namespace CustomCADs.Accounts.Endpoints.Roles;

internal static class Mapper
{
    internal static RoleResponse ToRoleResponse(this RoleReadDto role)
        => new(role.Name, role.Description);
}