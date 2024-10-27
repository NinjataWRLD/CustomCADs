﻿using CustomCADs.Catalog.Endpoints.Categories.Endpoints;

namespace CustomCADs.Catalog.Endpoints.Products.Endpoints.RecentProducts;

public class RecentProductsResponse
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Status { get; set; }
    public required string CreationDate { get; set; }
    public CategoryResponseDto Category { get; set; } = new();
}