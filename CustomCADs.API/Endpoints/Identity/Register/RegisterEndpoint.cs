﻿using CustomCADs.Application.Common.Contracts;
using CustomCADs.Application.Models.Users;
using CustomCADs.Application.UseCases.Users.Commands.Create;
using CustomCADs.Auth;
using CustomCADs.Auth.Contracts;
using FastEndpoints;
using FluentValidation.Results;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Identity;
using static CustomCADs.Domain.Roles.RoleConstants;

namespace CustomCADs.API.Endpoints.Identity.Register;

using static ApiMessages;
using static StatusCodes;

public class RegisterEndpoint(IMediator mediator, IAppUserManager manager, IEmailService email, IConfiguration config) : Endpoint<RegisterRequest>
{
    public override void Configure()
    {
        Post("Register/{role}");
        Group<IdentityGroup>();
        Description(d => d
            .WithSummary("Creates a new account with the specified parameters for the user and verifies the ownership of the email by sending a token.")
            .Produces<EmptyResponse>(Status200OK)
            .ProducesProblem(Status400BadRequest));
    }

    public override async Task HandleAsync(RegisterRequest req, CancellationToken ct)
    {
        AppUser user = new(req.Username, req.Email);
        IdentityResult result = await manager.CreateAsync(user, req.Password).ConfigureAwait(false);

        if (!result.Succeeded)
        {
            var failures = result.Errors.Select(e => new ValidationFailure() 
            {
                ErrorMessage = e.Description 
            });
            ValidationFailures.AddRange(failures);

            await SendErrorsAsync().ConfigureAwait(false);
            return;
        }

        if (!(req.Role == Client || req.Role == Contributor))
        {
            ValidationFailures.Add(new()
            {
                ErrorMessage = ForbiddenRoleRegister,
            });
            await SendErrorsAsync();
            return;
        }
        await manager.AddToRoleAsync(user, req.Role).ConfigureAwait(false);

        UserModel model = req.Adapt<UserModel>();
        model.Role = null!; // For EF Core

        CreateUserCommand command = new(model);
        await mediator.Send(command, ct).ConfigureAwait(false);

        string serverUrl = config["URLs:Server"] ?? "https://customcads.onrender.com";
        string token = await manager.GenerateEmailConfirmationTokenAsync(user).ConfigureAwait(false);

        string endpoint = Path.Combine(serverUrl, $"API/Identity/VerifyEmail/{model.UserName}") + $"?token={token}";
        await email.SendVerificationEmailAsync(req.Email, endpoint).ConfigureAwait(false);
        
        await SendOkAsync("Check your email.").ConfigureAwait(false);
    }
}
