﻿using CustomCADs.Carts.Application.Carts.Commands.Delete;
using CustomCADs.Shared.Core.Common.TypedIds.Carts;

namespace CustomCADs.Carts.Endpoints.Carts.Delete.Cart;
public sealed class DeleteCartEndpoint(IRequestSender sender)
    : Endpoint<DeleteCartRequest>
{
    public override void Configure()
    {
        Delete("{id}");
        Group<CartsGroup>();
        Description(d => d
            .WithSummary("09. Delete")
            .WithDescription("Delete your Cart by specifying its Id")
        );
    }

    public override async Task HandleAsync(DeleteCartRequest req, CancellationToken ct)
    {
        DeleteCartCommand command = new(
            Id: new CartId(req.Id),
            BuyerId: User.GetAccountId()
        );
        await sender.SendCommandAsync(command, ct).ConfigureAwait(false);

        await SendNoContentAsync().ConfigureAwait(false);
    }
}
