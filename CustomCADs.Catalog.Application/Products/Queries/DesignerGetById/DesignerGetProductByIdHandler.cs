﻿using CustomCADs.Catalog.Application.Common.Exceptions;
using CustomCADs.Catalog.Domain.Products.Reads;
using CustomCADs.Shared.Application.Requests.Sender;
using CustomCADs.Shared.UseCases.Accounts.Queries;
using CustomCADs.Shared.UseCases.Cads.Queries;
using CustomCADs.Shared.UseCases.Categories.Queries;

namespace CustomCADs.Catalog.Application.Products.Queries.DesignerGetById;

public sealed class DesignerGetProductByIdHandler(IProductReads reads, IRequestSender sender)
    : IQueryHandler<DesignerGetProductByIdQuery, DesignerGetProductByIdDto>
{
    public async Task<DesignerGetProductByIdDto> Handle(DesignerGetProductByIdQuery req, CancellationToken ct)
    {
        Product product = await reads.SingleByIdAsync(req.Id, track: false, ct: ct).ConfigureAwait(false)
            ?? throw ProductNotFoundException.ById(req.Id);

        GetCadByIdQuery cadQuery = new(product.CadId);
        var cad = await sender.SendQueryAsync(cadQuery, ct).ConfigureAwait(false);

        GetUsernameByIdQuery usernameQuery = new(product.CreatorId);
        string username = await sender.SendQueryAsync(usernameQuery, ct).ConfigureAwait(false);

        GetCategoryNameByIdQuery categoryQuery = new(product.CategoryId);
        string category = await sender.SendQueryAsync(categoryQuery, ct).ConfigureAwait(false);

        return product.ToDesignerGetProductByIdDto(cad.ToCadDto(), username, category);
    }
}
