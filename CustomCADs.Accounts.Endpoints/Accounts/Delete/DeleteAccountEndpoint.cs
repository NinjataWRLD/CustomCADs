﻿using CustomCADs.Accounts.Application.Accounts.Commands.Delete;

namespace CustomCADs.Accounts.Endpoints.Accounts.Delete;

public sealed class DeleteAccountEndpoint(IRequestSender sender)
    : Endpoint<DeleteAccountRequest>
{
    public override void Configure()
    {
        Delete("{username}");
        Group<AccountsGroup>();
        Description(d => d
            .WithSummary("4. Delete")
            .WithDescription("Delete an Account by specifying its Username")
        );
    }

    public override async Task HandleAsync(DeleteAccountRequest req, CancellationToken ct)
    {
        DeleteAccountCommand command = new(req.Username);
        await sender.SendCommandAsync(command, ct).ConfigureAwait(false);

        await SendNoContentAsync().ConfigureAwait(false);
    }
}
