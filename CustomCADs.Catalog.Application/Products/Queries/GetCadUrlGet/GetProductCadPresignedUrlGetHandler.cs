﻿using CustomCADs.Catalog.Application.Common.Exceptions;
using CustomCADs.Catalog.Domain.Products.Reads;
using CustomCADs.Shared.Application.Requests.Sender;
using CustomCADs.Shared.Application.Storage;
using CustomCADs.Shared.UseCases.Cads.Queries;

namespace CustomCADs.Catalog.Application.Products.Queries.GetCadUrlGet;

public sealed class GetProductCadPresignedUrlGetHandler(IProductReads reads, IStorageService storage, IRequestSender sender)
    : IQueryHandler<GetProductCadPresignedUrlGetQuery, GetProductCadPresignedUrlGetDto>
{
    public async Task<GetProductCadPresignedUrlGetDto> Handle(GetProductCadPresignedUrlGetQuery req, CancellationToken ct)
    {
        Product product = await reads.SingleByIdAsync(req.Id, track: false, ct: ct).ConfigureAwait(false)
            ?? throw ProductNotFoundException.ById(req.Id);

        if (product.CreatorId != req.CreatorId)
        {
            throw ProductAuthorizationException.ByProductId(req.Id);
        }

        GetCadByIdQuery cadQuery = new(product.CadId);
        var (Key, ContentType, _, _) = await sender.SendQueryAsync(cadQuery, ct).ConfigureAwait(false);

        string cadUrl = await storage.GetPresignedGetUrlAsync(
            key: Key,
            contentType: ContentType
        ).ConfigureAwait(false);

        return new(PresignedUrl: cadUrl);
    }
}
