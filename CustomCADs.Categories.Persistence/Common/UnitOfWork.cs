﻿using CustomCADs.Categories.Domain.Common;
using CustomCADs.Shared.Core.Common.Exceptions;

namespace CustomCADs.Categories.Persistence.Common;

public class UnitOfWork(CategoriesContext context) : IUnitOfWork
{
    public async Task SaveChangesAsync(CancellationToken ct = default)
    {
        try
        {
            await context.SaveChangesAsync(ct).ConfigureAwait(false);
        }
        catch (DbUpdateConcurrencyException ex)
        {
            throw DatabaseConflictException.Custom(ex.Message);
        }
        catch (DbUpdateException ex)
        {
            throw DatabaseException.Custom(ex.Message);
        }
    }
}
