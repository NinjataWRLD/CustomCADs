﻿using CustomCADs.Domain.Cads;
using CustomCADs.Domain.Cads.Reads;
using Microsoft.EntityFrameworkCore;

namespace CustomCADs.Persistence.Repositories.Reads;

public class CadReads(ApplicationContext context) : ICadReads
{
    public IQueryable<Cad> GetAll(bool asNoTracking = false)
        => context.Cads
            .Query(asNoTracking)
            .Include(o => o.Category)
            .Include(o => o.Creator)
            .AsSplitQuery();

    public async Task<Cad?> GetByIdAsync(int id, bool asNoTracking = false, CancellationToken ct = default)
        => await context.Cads
            .Query(asNoTracking)
            .Include(o => o.Category)
            .Include(o => o.Creator)
            .AsSplitQuery()
            .FirstOrDefaultAsync(c => c.Id == id, ct)
            .ConfigureAwait(false);

    public async Task<bool> ExistsByIdAsync(int id, CancellationToken ct = default)
        => await context.Cads
            .AnyAsync(o => o.Id == id, ct)
            .ConfigureAwait(false);

    public int Count(Func<Cad, bool> predicate)
        => context.Cads
            .AsNoTracking()
            .Include(c => c.Creator)
            .Count(predicate);
}
