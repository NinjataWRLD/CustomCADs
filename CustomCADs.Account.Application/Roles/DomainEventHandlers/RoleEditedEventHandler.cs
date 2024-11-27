﻿using CustomCADs.Account.Domain.Roles;
using CustomCADs.Account.Domain.Roles.DomainEvents;
using CustomCADs.Shared.Application.Cache;

namespace CustomCADs.Account.Application.Roles.DomainEventHandlers;

public class RoleEditedEventHandler(ICacheService cache)
{
    public async Task Handle(RoleEditedDomainEvent de)
    {
        await cache.RemoveAsync<IEnumerable<Role>>($"roles").ConfigureAwait(false);
        await cache.SetRangeAsync(
            ($"roles/{de.Id}", de.Role),
            ($"roles/{de.Role.Name}", de.Role)
        ).ConfigureAwait(false);
    }
}