﻿using CustomCADs.Orders.Application.Common.Exceptions;
using CustomCADs.Orders.Domain.Common;
using CustomCADs.Orders.Domain.Orders.Reads;

namespace CustomCADs.Orders.Application.Orders.Commands.Accept;

public sealed class AcceptOrderHandler(IOrderReads reads, IUnitOfWork uow)
    : ICommandHandler<AcceptOrderCommand>
{
    public async Task Handle(AcceptOrderCommand req, CancellationToken ct)
    {
        Order order = await reads.SingleByIdAsync(req.Id, ct: ct).ConfigureAwait(false)
            ?? throw OrderNotFoundException.ById(req.Id);

        order.SetAcceptedStatus();
        order.SetDesignerId(req.DesignerId);

        await uow.SaveChangesAsync(ct).ConfigureAwait(false);
    }
}

