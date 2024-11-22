﻿namespace CustomCADs.Shared.Speedy.Models.Shipment.Service.AdditionalServices.Return.ElectronicReceipt;

public record ShipmentElectronicReturnReceiptAdditionalServiceModel(
    string[] RecipientEmails,
    bool? ThirdPartyPayer
);