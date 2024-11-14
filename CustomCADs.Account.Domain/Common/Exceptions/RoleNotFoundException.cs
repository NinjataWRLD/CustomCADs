﻿using CustomCADs.Shared.Core.Common.Exceptions;

namespace CustomCADs.Account.Domain.Common.Exceptions;

public class RoleNotFoundException : BaseException
{
    private RoleNotFoundException(string message, Exception? inner) : base(message, inner) { }

    public static RoleNotFoundException General(Exception? inner = default)
        => new("The requested Role does not exist.", inner);

    public static RoleNotFoundException ById(RoleId id, Exception? inner = default)
        => new($"The Role with id: {id} does not exist.", inner);

    public static RoleNotFoundException ByName(string name, Exception? inner = default)
        => new($"The Role with name: {name} does not exist.", inner);

    public static RoleNotFoundException Custom(string message, Exception? inner = default)
        => new(message, inner);
}