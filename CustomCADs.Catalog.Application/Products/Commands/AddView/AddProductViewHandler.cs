﻿using CustomCADs.Catalog.Application.Common.Exceptions;
using CustomCADs.Catalog.Domain.Common;
using CustomCADs.Catalog.Domain.Products.Reads;

namespace CustomCADs.Catalog.Application.Products.Commands.AddView;

public sealed class AddProductViewHandler(IProductReads reads, IUnitOfWork uow)
    : ICommandHandler<AddProductViewCommand>
{
    public async Task Handle(AddProductViewCommand req, CancellationToken ct)
    {
        Product product = await reads.SingleByIdAsync(req.Id, ct: ct).ConfigureAwait(false)
            ?? throw ProductNotFoundException.ById(req.Id);

        product.AddToViewCount();
        await uow.SaveChangesAsync(ct).ConfigureAwait(false);
    }
}
