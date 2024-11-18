﻿using CustomCADs.Account.Application.Users.Queries.GetAll;

namespace CustomCADs.Account.Endpoints.Users.GetAll;

public class GetUsersEndpoint(IRequestSender sender)
    : Endpoint<GetUsersRequest, GetUsersResponse>
{
    public override void Configure()
    {
        Get("");
        Group<UsersGroup>();
    }

    public override async Task HandleAsync(GetUsersRequest req, CancellationToken ct)
    {
        GetAllUsersQuery query = new(
            Username: req.Name,
            Sorting: new(req.SortingType, req.SortingDirection),
            Page: req.Page,
            Limit: req.Limit
        );
        GetAllUsersDto result = await sender.SendQueryAsync(query, ct).ConfigureAwait(false);

        GetUsersResponse response = new(
            result.Count,
            result.Users.Select(u => u.ToUserResponse()).ToArray()
        );
        await SendOkAsync(response).ConfigureAwait(false);
    }
}