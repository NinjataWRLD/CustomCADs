﻿using CustomCADs.Catalog.Application.Categories.Queries;
using CustomCADs.Catalog.Application.Categories.Queries.GetById;

namespace CustomCADs.Catalog.Endpoints.Categories.Get;

public class GetCategoryEndpoint(IRequestSender sender)
    : Endpoint<GetCategoryRequest, CategoryResponse>
{
    public override void Configure()
    {
        Get("{id}");
        AllowAnonymous();
        Group<CategoriesGroup>();
    }

    public override async Task HandleAsync(GetCategoryRequest req, CancellationToken ct)
    {
        CategoryId id = new(req.Id);
        GetCategoryByIdQuery query = new(id);
        CategoryReadDto model = await sender.SendQueryAsync(query, ct).ConfigureAwait(false);

        CategoryResponse response = new(model.Id.Value, model.Name);
        await SendOkAsync(response).ConfigureAwait(false);
    }
}