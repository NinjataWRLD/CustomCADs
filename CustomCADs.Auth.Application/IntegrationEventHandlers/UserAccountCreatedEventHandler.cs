﻿using CustomCADs.Shared.IntegrationEvents.Account.Users;

namespace CustomCADs.Auth.Application.IntegrationEventHandlers;

public class UserAccountCreatedEventHandler(IUserService service)
{
    public async Task Handle(UserAccountCreatedIntegrationEvent ie)
    {
        await service.UpdateAccountIdAsync(ie.Username, ie.Id);
    }
}