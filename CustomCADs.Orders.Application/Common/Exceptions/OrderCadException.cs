﻿using CustomCADs.Shared.Core.Bases.Exceptions;

namespace CustomCADs.Orders.Application.Common.Exceptions;

public class OrderCadException : BaseException
{
    private OrderCadException(string message, Exception? inner) : base(message, inner) { }

    public static OrderCadException General(Exception? inner = null)
        => new("Cannot access this Order's Cad as it has no CadId.", inner);

    public static OrderCadException ById(OrderId id, Exception? inner = null)
        => new($"Cannot access Order: {id}'s Cad as it has no CadId.", inner);

    public static OrderCadException Custom(string message, Exception? inner = null)
        => new(message, inner);
}
