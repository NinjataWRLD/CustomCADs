﻿using CustomCADs.Delivery.Domain.Shipments.Enums;
using CustomCADs.Delivery.Domain.Shipments.ValueObjects;
using CustomCADs.Shared.Core.Common;
using CustomCADs.Shared.Core.Common.TypedIds.Accounts;

namespace CustomCADs.Delivery.Application.Shipments.Queries.GetAll;

public sealed record GetAllShipmentsQuery(
    Pagination Pagination,
    AccountId? ClientId = null,
    ShipmentStatus? ShipmentStatus = null,
    ShipmentSorting? Sorting = null
) : IQuery<Result<GetAllShipmentsDto>>;
