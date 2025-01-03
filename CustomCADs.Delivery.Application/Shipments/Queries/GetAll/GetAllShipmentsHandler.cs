﻿using CustomCADs.Delivery.Domain.Shipments.Reads;
using CustomCADs.Shared.Core.Common;

namespace CustomCADs.Delivery.Application.Shipments.Queries.GetAll;

public class GetAllShipmentsHandler(IShipmentReads reads)
    : IQueryHandler<GetAllShipmentsQuery, Result<GetAllShipmentsDto>>
{
    public async Task<Result<GetAllShipmentsDto>> Handle(GetAllShipmentsQuery req, CancellationToken ct)
    {
        ShipmentQuery query = new(
            ClientId: req.ClientId,
            Sorting: req.Sorting,
            Pagination: req.Pagination
        );
        Result<Shipment> result = await reads.AllAsync(query, track: false, ct: ct).ConfigureAwait(false);

        return new(
            Count: result.Count,
            Items: [.. result.Items.Select(i => i.ToGetAllShipmentsDto())]
        );
    }
}
