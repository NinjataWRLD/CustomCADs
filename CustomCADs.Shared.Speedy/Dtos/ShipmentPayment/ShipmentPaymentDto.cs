﻿namespace CustomCADs.Shared.Speedy.Dtos.ShipmentPayment;

using Enums;

public record ShipmentPaymentDto(
    Payer CourierServicePayer,
    Payer? DeclaredValuePayer,
    Payer? PackagePayer,
    long? ThirdPartyClientId,
    ShipmentDiscountCardIdDto? DiscountCardId,
    BankAccountDto? SenderBankAccount,
    bool? AdministrativeFee
);