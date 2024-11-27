﻿using CustomCADs.Account.Application.Users.Queries.GetAll;
using CustomCADs.Account.Application.Users.Queries.GetById;
using CustomCADs.Account.Domain.Users;

namespace CustomCADs.Account.Application.Users;

public static class Mapper
{
    public static GetAllUsersItem ToGetAllUsersItem(this User user)
        => new(
            user.Id,
            user.Username,
            user.Email,
            user.RoleName,
            user.Names.FirstName,
            user.Names.LastName
        );

    public static GetUserByIdDto ToGetUserByIdDto(this User user)
        => new(
            Role: user.RoleName,
            Username: user.Username,
            Email: user.Email,
            FirstName: user.Names.FirstName,
            LastName: user.Names.LastName
        );
}