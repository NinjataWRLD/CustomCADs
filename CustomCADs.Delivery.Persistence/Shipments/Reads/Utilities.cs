﻿using CustomCADs.Delivery.Domain.Shipments;
using CustomCADs.Delivery.Domain.Shipments.Enums;
using CustomCADs.Delivery.Domain.Shipments.ValueObjects;
using CustomCADs.Shared.Core.Common.Enums;
using CustomCADs.Shared.Core.Common.TypedIds.Accounts;

namespace CustomCADs.Delivery.Persistence.Shipments.Reads;

public static class Utilities
{
    public static IQueryable<Shipment> WithFilter(this IQueryable<Shipment> query, AccountId? clientId = null, ShipmentStatus? shipmentStatus = null)
    {
        if (clientId is not null)
        {
            query = query.Where(s => s.BuyerId == clientId);
        }
        if (shipmentStatus is not null)
        {
            query = query.Where(s => s.ShipmentStatus == shipmentStatus);
        }

        return query;
    }

    public static IQueryable<Shipment> WithSorting(this IQueryable<Shipment> query, ShipmentSorting sorting)
    {
        return sorting switch
        {
            { Type: ShipmentSortingType.CreationDate, Direction: SortingDirection.Ascending } => query.OrderBy(c => c.Id), // will fix
            { Type: ShipmentSortingType.CreationDate, Direction: SortingDirection.Descending } => query.OrderByDescending(c => c.Id), // will fix
            _ => query,
        };
    }

    public static IQueryable<Shipment> WithPagination(this IQueryable<Shipment> query, int page = 1, int limit = 20)
    {
        return query.Skip((page - 1) * limit).Take(limit);
    }
}
