﻿using CustomCADs.Shared.Core.Domain.ValueObjects;
using CustomCADs.Shared.Core.Domain.ValueObjects.Ids.Categories;
using CustomCADs.Shared.Core.Domain.ValueObjects.Ids.Inventory;

namespace CustomCADs.Inventory.Application.Products.Queries.GetAll;

public record GetAllProductsDto(int Count, ICollection<GetAllProductsItem> Products);

public record GetAllProductsItem(
    ProductId Id,
    string Name,
    string Status,
    DateTime UploadDate,
    Image Image,
    string CreatorName,
    (CategoryId Id, string Name) Category
);