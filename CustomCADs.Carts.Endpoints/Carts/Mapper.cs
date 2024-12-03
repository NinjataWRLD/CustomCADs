﻿using CustomCADs.Carts.Application.Carts.Queries.GetAll;
using CustomCADs.Carts.Application.Carts.Queries.GetById;
using CustomCADs.Carts.Domain.Carts.Entities;
using CustomCADs.Carts.Endpoints.Carts.Get.All;
using CustomCADs.Carts.Endpoints.Carts.Get.Recent;
using CustomCADs.Carts.Endpoints.Carts.Get.Single;
using CustomCADs.Carts.Endpoints.Helpers.Dtos;

namespace CustomCADs.Carts.Endpoints.Carts;

using static Constants;

internal static class Mapper
{
    internal static GetCartsDto ToGetCartsDto(this GetAllCartsDto cart)
        => new(
            Id: cart.Id.Value,
            Total: cart.Total,
            PurchaseDate: cart.PurchaseDate.ToString(DateFormatString),
            ItemsCount: cart.ItemsCount
        );

    internal static RecentCartsResponse ToRecentCartsResponse(this GetAllCartsDto cart)
        => new(
            Id: cart.Id.Value,
            PurchaseDate: cart.PurchaseDate.ToString(DateFormatString)
        );

    internal static GetCartResponse ToGetCartResponse(this GetCartByIdDto cart)
        => new(
            Id: cart.Id.Value,
            Total: cart.Total,
            PurchaseDate: cart.PurchaseDate.ToString(DateFormatString),
            BuyerId: cart.BuyerId.Value,
            Items: [.. cart.Items.Select(o => o.ToCartItemDto())]
        );

    internal static CartItemDto ToCartItemDto(this CartItem item)
        => new(
            Id: item.Id.Value,
            Quantity: item.Quantity,
            DeliveryType: item.DeliveryType.ToString(),
            Price: item.Price,
            PurchaseDate: item.PurchaseDate.ToString(DateFormatString),
            ProductId: item.ProductId.Value,
            CartId: item.CartId.Value,
            CadId: item.CadId?.Value,
            ShipmentId: item.ShipmentId?.Value,
            Cost: item.Cost
        );
}