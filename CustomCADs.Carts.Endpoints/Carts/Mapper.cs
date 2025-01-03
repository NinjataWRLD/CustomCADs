﻿using CustomCADs.Carts.Application.Carts.Queries.CalculateShipment;
using CustomCADs.Carts.Application.Carts.Queries.GetAll;
using CustomCADs.Carts.Application.Carts.Queries.GetById;
using CustomCADs.Carts.Endpoints.Carts.Get.All;
using CustomCADs.Carts.Endpoints.Carts.Get.CalculateShipment;
using CustomCADs.Carts.Endpoints.Carts.Get.Recent;
using CustomCADs.Carts.Endpoints.Carts.Get.Single;
using CustomCADs.Carts.Endpoints.Carts.Post.Cart;

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
            ShipmentId: cart.ShipmentId?.Value,
            Items: [.. cart.Items.Select(o => o.ToCartItemResponse())]
        );
    
    internal static PostCartResponse ToPostCartResponse(this GetCartByIdDto cart)
        => new(
            Id: cart.Id.Value,
            PurchaseDate: cart.PurchaseDate.ToString(DateFormatString),
            BuyerId: cart.BuyerId.Value
        );

    internal static CartItemResponse ToCartItemResponse(this CartItemDto item)
        => new(
            Id: item.Id.Value,
            Quantity: item.Quantity,
            Delivery: item.Delivery,
            Weight: item.Weight,
            Price: item.Price,
            ProductId: item.ProductId.Value,
            CartId: item.CartId.Value,
            CadId: item.CadId?.Value,
            Cost: item.Cost
        );

    internal static CalculateCartShipmentResponse ToCalculateCartShipmentResponse(this CalculateCartShipmentDto calculation)
        => new(
            Service: calculation.Service,
            Total: calculation.Total,
            Currency: calculation.Currency,
            PickupDate: calculation.PickupDate.ToString(SpeedyDateFormatString),
            DeliveryDeadline: calculation.DeliveryDeadline.ToString(SpeedyDateFormatString)
        );
}
