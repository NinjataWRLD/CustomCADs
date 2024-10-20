﻿using CustomCADs.Application.Common.Exceptions;
using CustomCADs.Domain.Cads;
using CustomCADs.Domain.Cads.Enums;
using CustomCADs.Domain.Cads.Reads;
using CustomCADs.Domain.Shared;
using MediatR;

namespace CustomCADs.Application.UseCases.Cads.Commands.SetStatus;

public class SetCadStatusHandler(ICadReads reads, IUnitOfWork uow) : IRequestHandler<SetCadStatusCommand>
{
    public async Task Handle(SetCadStatusCommand req, CancellationToken ct)
    {
        Cad cad = await reads.GetByIdAsync(req.Id, ct: ct)
            ?? throw new CadNotFoundException(req.Id);

        switch (req.Action)
        {
            case "validate":
                ValidateCad(cad);
                break;

            case "report":
                ReportCad(cad);
                break;

            default: throw new CadStatusException(req.Id, req.Action);
        }

        await uow.SaveChangesAsync().ConfigureAwait(false);
    }

    private static void ValidateCad(Cad cad)
    {
        if (cad.Status != CadStatus.Unchecked)
        {
            throw new CadStatusException();
        }
        cad.Status = CadStatus.Validated;
    }
    
    private static void ReportCad(Cad cad)
    {
        if (cad.Status != CadStatus.Unchecked)
        {
            throw new CadStatusException();
        }
        cad.Status = CadStatus.Reported;
    }
}
