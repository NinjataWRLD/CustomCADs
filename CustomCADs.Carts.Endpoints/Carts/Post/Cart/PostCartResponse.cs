﻿namespace CustomCADs.Carts.Endpoints.Carts.Post.Cart;

public sealed record PostCartResponse(
    Guid Id,
    string PurchaseDate,
    Guid BuyerId
);