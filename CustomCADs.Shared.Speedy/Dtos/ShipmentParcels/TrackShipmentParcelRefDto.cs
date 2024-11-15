﻿namespace CustomCADs.Shared.Speedy.Dtos.ShipmentParcels;

public record TrackShipmentParcelRefDto(
    string? Ref,

    // Copied from ShipmentParcelRefDto
    string? Id,
    string? ExternalCarrierParcelNumber,
    string? FullBarcode
);