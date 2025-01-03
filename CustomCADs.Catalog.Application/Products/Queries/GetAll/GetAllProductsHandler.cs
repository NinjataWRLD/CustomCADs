﻿using CustomCADs.Catalog.Domain.Products.Reads;
using CustomCADs.Shared.Application.Requests.Sender;
using CustomCADs.Shared.Core.Common;
using CustomCADs.Shared.Core.Common.TypedIds.Accounts;
using CustomCADs.Shared.Core.Common.TypedIds.Categories;
using CustomCADs.Shared.Core.Common.TypedIds.Files;
using CustomCADs.Shared.UseCases.Accounts.Queries;
using CustomCADs.Shared.UseCases.Categories.Queries;
using CustomCADs.Shared.UseCases.Images.Queries;

namespace CustomCADs.Catalog.Application.Products.Queries.GetAll;

public sealed class GetAllProductsHandler(IProductReads reads, IRequestSender sender)
    : IQueryHandler<GetAllProductsQuery, Result<GetAllProductsDto>>
{
    public async Task<Result<GetAllProductsDto>> Handle(GetAllProductsQuery req, CancellationToken ct)
    {
        ProductQuery productQuery = new(
            CategoryId: req.CategoryId,
            CreatorId: req.CreatorId,
            Status: req.Status,
            Name: req.Name,
            Sorting: req.Sorting,
            Pagination: req.Pagination
        );
        Result<Product> result = await reads.AllAsync(productQuery, track: false, ct: ct).ConfigureAwait(false);

        AccountId[] userIds = [.. result.Items.Select(p => p.CreatorId).Distinct()];
        IEnumerable<(AccountId Id, string Username)> users = await sender
            .SendQueryAsync(new GetUsernamesByIdsQuery(userIds), ct).ConfigureAwait(false);

        CategoryId[] categoryIds = [.. result.Items.Select(p => p.CategoryId).Distinct()];
        IEnumerable<(CategoryId Id, string Name)> categories = await sender
            .SendQueryAsync(new GetCategoriesByIdsQuery(categoryIds), ct).ConfigureAwait(false);

        AccountId[] buyerIds = [.. result.Items.Select(c => c.CreatorId)];
        GetTimeZonesByIdsQuery timeZonesQuery = new(buyerIds);
        (AccountId Id, string TimeZone)[] timeZones = await sender
            .SendQueryAsync(timeZonesQuery, ct).ConfigureAwait(false);

        ImageId[] imageIds = [.. result.Items.Select(c => c.ImageId)]; ;
        GetImagesByIdsQuery imagesQuery = new(imageIds);
        var images = await sender.SendQueryAsync(imagesQuery, ct).ConfigureAwait(false);

        return new(
            Count: result.Count,
            Items: result.Items.Select(p => p.ToGetAllProductsItem(
                image: images.Single(i => i.Id == p.ImageId).ToImageDto(),
                username: users.Single(u => u.Id == p.CreatorId).Username,
                categoryName: categories.Single(c => c.Id == p.CategoryId).Name,
                timeZone: timeZones.Single(t => t.Id == p.CreatorId).TimeZone
            )).ToArray()
        );
    }
}
