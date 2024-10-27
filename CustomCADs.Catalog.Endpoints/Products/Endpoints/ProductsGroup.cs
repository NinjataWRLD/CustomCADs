﻿using FastEndpoints;
using Microsoft.AspNetCore.Http;

namespace CustomCADs.Catalog.Endpoints.Products.Endpoints;

using static StatusCodes;

public class ProductsGroup : Group
{
    public ProductsGroup()
    {
        Configure("Products", ep =>
        {
            ep.Roles("Contributor", "Designer"); // Role Constants
            ep.Description(d => d
                .WithTags("Products")
                .ProducesProblem(Status401Unauthorized)
                .ProducesProblem(Status403Forbidden)
                .ProducesProblem(Status500InternalServerError));
        });
    }
}