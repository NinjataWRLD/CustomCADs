﻿using CustomCADs.Account.Application.Roles.Common.Exceptions;
using CustomCADs.Account.Domain.Roles;
using CustomCADs.Account.Domain.Roles.Reads;
using CustomCADs.Account.Domain.Shared;
using CustomCADs.Shared.Domain;

namespace CustomCADs.Account.Application.Roles.Commands.DeleteById;

public class DeleteRoleByIdHandler(
    IRoleReads reads,
    IWrites<Role> writes,
    IUnitOfWork uow)
{
    public async Task Handle(DeleteRoleByIdCommand req, CancellationToken ct)
    {
        Role role = await reads.SingleByIdAsync(req.Id, ct: ct).ConfigureAwait(false)
            ?? throw new RoleNotFoundException($"The Role with id: {req.Id} does not exist.");

        writes.Remove(role);
        await uow.SaveChangesAsync(ct).ConfigureAwait(false);
    }
}