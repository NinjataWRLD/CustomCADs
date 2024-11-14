﻿using CustomCADs.Shared.Core.Domain;

namespace CustomCADs.Cads.Domain.Common;

public interface IWrites<TEntity> where TEntity : BaseAggregateRoot
{
    Task<TEntity> AddAsync(TEntity entity, CancellationToken ct = default);
    void Remove(TEntity entity);
}