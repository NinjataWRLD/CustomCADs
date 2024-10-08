﻿using static CustomCADs.Domain.DataConstants.RoleConstants;
using FastEndpoints;

namespace CustomCADs.API.Endpoints.Categories
{
    public class CategoriesGroup : Group
    {
        public CategoriesGroup()
        {
            Configure("Categories", ep =>
            {
                ep.Roles(Admin);
                ep.Description(opt => opt.WithTags("Categories"));
            });   
        }
    }
}
