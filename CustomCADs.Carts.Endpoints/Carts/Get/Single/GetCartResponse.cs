﻿using CustomCADs.Carts.Endpoints.Helpers.Dtos;

namespace CustomCADs.Carts.Endpoints.Carts.Get.Single;

public sealed record GetCartResponse(
    Guid Id,
    decimal Total,
    string PurchaseDate,
    Guid BuyerId,
    ICollection<CartItemDto> Items
);