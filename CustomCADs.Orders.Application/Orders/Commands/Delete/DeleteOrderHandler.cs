﻿using CustomCADs.Orders.Application.Common.Exceptions;
using CustomCADs.Orders.Domain.Common;
using CustomCADs.Orders.Domain.Orders.Reads;

namespace CustomCADs.Orders.Application.Orders.Commands.Delete;

public sealed class DeleteOrderHandler(IOrderReads reads, IWrites<Order> writes, IUnitOfWork uow)
    : ICommandHandler<DeleteOrderCommand>
{
    public async Task Handle(DeleteOrderCommand req, CancellationToken ct)
    {
        Order order = await reads.SingleByIdAsync(req.Id, ct: ct).ConfigureAwait(false)
            ?? throw OrderNotFoundException.ById(req.Id);

        if (order.BuyerId != req.BuyerId)
        {
            throw OrderAuthorizationException.ByOrderId(req.Id);
        }

        writes.Remove(order);
        await uow.SaveChangesAsync(ct).ConfigureAwait(false);
    }
}
