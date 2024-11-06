﻿using FastEndpoints;
using Microsoft.AspNetCore.Http;

namespace CustomCADs.Catalog.Endpoints.Categories;

using static Shared.Core.Constants;

using static StatusCodes;

public class CategoriesGroup : Group
{
    public CategoriesGroup()
    {
        Configure("categories", ep =>
        {
            ep.Roles(Admin);
            ep.Description(opt =>
            {
                opt.WithTags("Categories");
                opt.ProducesProblem(Status500InternalServerError);
            });
        });
    }
}