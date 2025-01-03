﻿using CustomCADs.Orders.Application.Common.Exceptions;
using CustomCADs.Orders.Domain.Common;
using CustomCADs.Orders.Domain.Orders.Reads;

namespace CustomCADs.Orders.Application.Orders.Commands.Report;

public sealed class ReportOrderHandler(IOrderReads reads, IUnitOfWork uow)
    : ICommandHandler<ReportOrderCommand>
{
    public async Task Handle(ReportOrderCommand req, CancellationToken ct)
    {
        Order order = await reads.SingleByIdAsync(req.Id, ct: ct).ConfigureAwait(false)
            ?? throw OrderNotFoundException.ById(req.Id);

        order.SetReportedStatus();

        await uow.SaveChangesAsync(ct).ConfigureAwait(false);
    }
}

