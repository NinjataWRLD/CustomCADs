﻿using CustomCADs.Shared.Application.Delivery.Dtos;

namespace CustomCADs.Shared.Application.Delivery;

public interface IDeliveryService
{
    Task<ShipmentDto> ShipAsync(ShipRequestDto req, CancellationToken ct = default);
    Task<CalculationDto[]> CalculateAsync(string shipmentId, CancellationToken ct = default);
    Task<byte[]> PrintAsync(string shipmentId, CancellationToken ct = default);
    Task<ShipmentStatusDto[]> TrackAsync(string shipmentId, CancellationToken ct = default);
}
