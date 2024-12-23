﻿using CustomCADs.Orders.Domain.Orders.Enums;
using CustomCADs.Shared.Core.Common;
using CustomCADs.Shared.Core.Common.TypedIds.Accounts;

namespace CustomCADs.Orders.Domain.Orders.Reads;

public interface IOrderReads
{
    Task<Result<Order>> AllAsync(OrderQuery query, bool track = true, CancellationToken ct = default);
    Task<Order?> SingleByIdAsync(OrderId id, bool track = true, CancellationToken ct = default);
    Task<bool> ExistsByIdAsync(OrderId id, CancellationToken ct = default);
    Task<Dictionary<OrderStatus, int>> CountByStatusAsync(AccountId buyerId, CancellationToken ct = default);
}
