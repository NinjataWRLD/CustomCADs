﻿using CustomCADs.Catalog.Domain.Common;
using CustomCADs.Catalog.Domain.Products;
using CustomCADs.Catalog.Domain.Products.Reads;
using CustomCADs.Shared.Core.Common;
using CustomCADs.Shared.UseCases.Products.Commands.AddPurchase;

namespace CustomCADs.Catalog.Application.Products.SharedCommandHandlers;

public sealed class AddProductPurchaseHandler(IProductReads reads, IUnitOfWork uow)
    : ICommandHandler<AddProductPurchaseCommand>
{
    public async Task Handle(AddProductPurchaseCommand req, CancellationToken ct)
    {
        ProductQuery query = new(Ids: req.Ids);
        Result<Product> result = await reads.AllAsync(query, ct: ct).ConfigureAwait(false);

        foreach (Product product in result.Items)
            product.AddToPurchaseCount();

        await uow.SaveChangesAsync(ct).ConfigureAwait(false);
    }
}