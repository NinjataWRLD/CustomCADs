﻿using CustomCADs.Inventory.Application.Products.Queries.GetAll;

namespace CustomCADs.Inventory.Endpoints.Products.Get.All;

public class GetProductsEndpoint(IRequestSender sender)
    : Endpoint<GetProductsRequest, GetProductsResponse>
{
    public override void Configure()
    {
        Get("");
        Group<ProductsGroup>();
        Description(d => d.WithSummary("9. I want to see all my Product"));
    }

    public override async Task HandleAsync(GetProductsRequest req, CancellationToken ct)
    {
        GetAllProductsQuery query = new(
            CreatorId: User.GetAccountId(),
            Name: req.Name,
            Sorting: new(req.SortingType, req.SortingDirection),
            Page: req.Page,
            Limit: req.Limit
        );
        GetAllProductsDto result = await sender.SendQueryAsync(query, ct).ConfigureAwait(false);

        GetProductsResponse response = new(
            result.Count,
            result.Products.Select(p => p.ToGetProductsDto()).ToArray()
        );
        await SendOkAsync(response).ConfigureAwait(false);
    }
}