﻿using CustomCADs.Accounts.Domain.Roles;
using CustomCADs.Accounts.Domain.Roles.DomainEvents;
using CustomCADs.Shared.Application.Cache;

namespace CustomCADs.Accounts.Application.Roles.DomainEventHandlers;

public class RoleCreatedEventHandler(ICacheService cache)
{
    public async Task Handle(RoleCreatedDomainEvent de)
    {
        await cache.RemoveAsync<IEnumerable<Role>>($"roles").ConfigureAwait(false);
        await cache.SetRangeAsync(
            ($"roles/{de.Role.Id}", de.Role),
            ($"roles/{de.Role.Name}", de.Role)
        ).ConfigureAwait(false);
    }
}
