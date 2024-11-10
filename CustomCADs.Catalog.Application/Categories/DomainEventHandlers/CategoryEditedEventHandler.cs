﻿using CustomCADs.Catalog.Domain.Categories.DomainEvents;
using CustomCADs.Shared.Application.Cache;

namespace CustomCADs.Catalog.Application.Categories.DomainEventHandlers;

public class CategoryEditedEventHandler(ICacheService cache)
{
    public async Task Handle(CategoryEditedDomainEvent de)
    {
        await cache.RemoveAsync<IEnumerable<Category>>($"categories").ConfigureAwait(false);
        await cache.SetAsync(($"categories/{de.Id}", de.Category)).ConfigureAwait(false);
    }
}