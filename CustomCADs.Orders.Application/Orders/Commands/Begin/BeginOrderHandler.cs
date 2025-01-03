﻿using CustomCADs.Orders.Application.Common.Exceptions;
using CustomCADs.Orders.Domain.Common;
using CustomCADs.Orders.Domain.Orders.Reads;

namespace CustomCADs.Orders.Application.Orders.Commands.Begin;

public sealed class BeginOrderHandler(IOrderReads reads, IUnitOfWork uow)
    : ICommandHandler<BeginOrderCommand>
{
    public async Task Handle(BeginOrderCommand req, CancellationToken ct)
    {
        Order order = await reads.SingleByIdAsync(req.Id, ct: ct).ConfigureAwait(false)
            ?? throw OrderNotFoundException.ById(req.Id);

        if (req.DesignerId != order.DesignerId)
        {
            throw OrderAuthorizationException.NotAssociated("begin");
        }
        order.SetBegunStatus();

        await uow.SaveChangesAsync(ct).ConfigureAwait(false);
    }
}

