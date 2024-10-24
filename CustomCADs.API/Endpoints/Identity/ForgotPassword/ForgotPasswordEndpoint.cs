﻿using CustomCADs.Application.Common.Contracts;
using CustomCADs.Auth;
using CustomCADs.Auth.Contracts;
using FastEndpoints;

namespace CustomCADs.API.Endpoints.Identity.ForgotPassword;

using static ApiMessages;
using static StatusCodes;

public class ForgotPasswordEndpoint(IAppUserManager manager, IEmailService email, IConfiguration config) : Endpoint<ForgotPasswordRequest>
{
    public override void Configure()
    {
        Get("ForgotPassword");
        Group<IdentityGroup>();
        Description(d => d
            .WithSummary("Sends an email with link to Reset Password.")
            .Produces<EmptyResponse>(Status200OK));
    }

    public override async Task HandleAsync(ForgotPasswordRequest req, CancellationToken ct)
    {
        AppUser? user = await manager.FindByEmailAsync(req.Email).ConfigureAwait(false);
        if (user == null)
        {
            ValidationFailures.Add(new()
            {
                ErrorMessage = string.Format(NotFound, "User"),
            });
            await SendErrorsAsync(Status404NotFound).ConfigureAwait(false);
            return;
        }

        string token = await manager.GeneratePasswordResetTokenAsync(user).ConfigureAwait(false);
        string clientUrl = config["URLs:Client"] ?? "https://customcads.onrender.com";

        string endpoint = Path.Combine(clientUrl + "/login/reset-password") + $"?email={req.Email}&token={token}";
        await email.SendForgotPasswordEmailAsync(req.Email, endpoint).ConfigureAwait(false);

        await SendOkAsync("Check your email!").ConfigureAwait(false);
    }
}
