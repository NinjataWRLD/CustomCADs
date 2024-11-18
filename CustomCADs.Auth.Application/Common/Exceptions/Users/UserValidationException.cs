﻿using CustomCADs.Shared.Core;
using CustomCADs.Shared.Core.Common.Exceptions;

namespace CustomCADs.Auth.Application.Common.Exceptions.Users;

using static Constants.ExceptionMessages;

public class UserValidationException : BaseException
{
    private UserValidationException(string message, Exception? inner) : base(message, inner) { }

    public static UserValidationException General(Exception? inner = null)
        => new(string.Format(Validation, "a", "User"), inner);

    public static UserValidationException Custom(string message, Exception? inner = null)
        => new(message, inner);
    
    public static UserValidationException CouldNotCreateUser(string username, Exception? inner = null)
        => Custom($"Couldn't create the user: {username}.", inner);

    public static UserValidationException AccountNotCreatedYet(string username, Exception? inner = default)
        => Custom($"The User with username: {username}'s account is still being created.", inner);
}