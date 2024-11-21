﻿namespace CustomCADs.Shared.Speedy.Models.Shipment.Service.AdditionalServices.Return.Swap;

public record ShipmentSwapAdditionalServiceModel(
    int ServiceId,
    int ParcelsCount,
    double? DeclaredValue,
    bool? Fragile,
    int? ReturnToOfficeId,
    bool? ThirdPartyPayer
);