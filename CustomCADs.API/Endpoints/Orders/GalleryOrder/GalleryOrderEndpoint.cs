﻿using CustomCADs.API.Endpoints.Orders.GetOrder;
using CustomCADs.API.Helpers;
using CustomCADs.Application.Contracts;
using CustomCADs.Application.Models.Cads;
using CustomCADs.Application.Models.Orders;
using CustomCADs.Domain.Enums;
using FastEndpoints;
using Mapster;

namespace CustomCADs.API.Endpoints.Orders.GalleryOrder
{
    using static ApiMessages;
    using static StatusCodes;

    public class GalleryOrderEndpoint(IOrderService orderService, ICadService cadService) : Endpoint<GalleryOrderRequest, GalleryOrderResponse>
    {
        public override void Configure()
        {
            Post("{cadId}");
            Group<OrdersGroup>();
            Description(d => d
                .WithSummary("Creates an Order entity with a Relation to the Cad with the specified id in the database.")
                .Produces<GalleryOrderResponse>(Status201Created, "application/json"));
        }
         
        public override async Task HandleAsync(GalleryOrderRequest req, CancellationToken ct)
        {
            CadModel cad = await cadService.GetByIdAsync(req.CadId).ConfigureAwait(false);
            OrderModel order = new()
            {
                Name = cad.Name,
                Description = string.Format(CadPurchasedMessage, req.CadId),
                Status = OrderStatus.Finished,
                CategoryId = cad.CategoryId,
                OrderDate = DateTime.Now,
                CadId = req.CadId,
                BuyerId = User.GetId(),
                DesignerId = cad.CreatorId,
                ImagePath = cad.Paths.ImagePath,
            };

            int id = await orderService.CreateAsync(order).ConfigureAwait(false);
            OrderModel createdOrder = await orderService.GetByIdAsync(id).ConfigureAwait(false);

            GalleryOrderResponse response = createdOrder.Adapt<GalleryOrderResponse>();
            await SendCreatedAtAsync<GetOrderEndpoint>(id, response).ConfigureAwait(false);
        }
    }
}
