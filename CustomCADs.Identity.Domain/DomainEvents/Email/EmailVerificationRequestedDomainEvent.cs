﻿using CustomCADs.Shared.Core.Bases.Events;

namespace CustomCADs.Identity.Domain.DomainEvents.Email;

public record EmailVerificationRequestedDomainEvent(
    string Email,
    string Endpoint
) : BaseDomainEvent;
