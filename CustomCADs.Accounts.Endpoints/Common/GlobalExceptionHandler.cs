﻿using CustomCADs.Accounts.Application.Common.Exceptions;
using CustomCADs.Accounts.Domain.Common.Exceptions.Accounts;
using CustomCADs.Accounts.Domain.Common.Exceptions.Roles;
using CustomCADs.Shared.Core.Common.Exceptions;
using Microsoft.AspNetCore.Diagnostics;

namespace CustomCADs.Accounts.Endpoints.Common;

using static StatusCodes;

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception ex, CancellationToken ct)
    {
        if (ex is AccountValidationException or RoleValidationException)
        {
            context.Response.StatusCode = Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Invalid Request Parameters",
                message = ex.Message,
            }, ct).ConfigureAwait(false);
        }
        else if (ex is AccountNotFoundException or RoleNotFoundException)
        {
            context.Response.StatusCode = Status404NotFound;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Resource Not Found",
                message = ex.Message,
            }, ct).ConfigureAwait(false);
        }
        else if (ex is DatabaseConflictException)
        {
            context.Response.StatusCode = Status409Conflict;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Database Conflict Ocurred",
                message = ex.Message,
            }, ct).ConfigureAwait(false);
        }
        else if (ex is DatabaseException)
        {
            context.Response.StatusCode = Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Database Error",
                message = ex.Message,
            }, ct).ConfigureAwait(false);
        }
        else
        {
            context.Response.StatusCode = Status500InternalServerError;
            await context.Response.WriteAsJsonAsync(new
            {
                error = "Internal Server Error",
                message = ex.Message,
            }, ct).ConfigureAwait(false);
        }

        return true;
    }
}
