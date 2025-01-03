﻿using CustomCADs.Shared.Core;
using CustomCADs.Shared.Core.Bases.Exceptions;

namespace CustomCADs.Carts.Domain.Common.Exceptions.Carts;

using static Constants.ExceptionMessages;

public class CartValidationException : BaseException
{
    private CartValidationException(string message, Exception? inner) : base(message, inner) { }

    public static CartValidationException General(Exception? inner = default)
        => new(string.Format(Validation, "a", "Cart"), inner);

    public static CartValidationException Range(string property, int max, int min, Exception? inner = default)
        => new(string.Format(RangeValidation, "A", "Cart", property, min, max), inner);

    public static CartValidationException ShipmentIdOnCartWithNoDelivery(Exception? inner = default)
        => new("Cannot set ShipmentId on a Cart with no requested Delivery", inner);

    public static CartValidationException NoShipmentIdOnCartWithDelivery(Exception? inner = default)
        => new("Must set ShipmentId on a Cart with requested Delivery", inner);

    public static CartValidationException Custom(string message, Exception? inner = default)
        => new(message, inner);
}
