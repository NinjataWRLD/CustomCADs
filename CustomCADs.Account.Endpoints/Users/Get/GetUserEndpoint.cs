﻿using CustomCADs.Account.Application.Users.Queries.GetByUsername;

namespace CustomCADs.Account.Endpoints.Users.Get;

public class GetUserEndpoint(IRequestSender sender)
    : Endpoint<GetUserRequest, UserResponse>
{
    public override void Configure()
    {
        Get("{username}");
        Group<UsersGroup>();
    }

    public override async Task HandleAsync(GetUserRequest req, CancellationToken ct)
    {
        GetUserByUsernameQuery query = new(req.Username);
        GetUserByUsernameDto dto = await sender.SendQueryAsync(query, ct);

        UserResponse response = dto.ToUserResponse(req.Username);
        await SendOkAsync(response).ConfigureAwait(false);
    }
}