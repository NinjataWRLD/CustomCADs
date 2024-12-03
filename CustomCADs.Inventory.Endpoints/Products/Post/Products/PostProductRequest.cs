﻿namespace CustomCADs.Inventory.Endpoints.Products.Post.Products;

public sealed record PostProductRequest(
    string Name,
    string Description,
    int CategoryId,
    decimal Price,
    string ImageKey,
    string ImageContentType,
    string CadKey,
    string CadContentType
);