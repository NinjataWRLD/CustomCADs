﻿using CustomCADs.Account.Application.Common.Contracts;

namespace CustomCADs.Account.Application.Users.Queries.GetUsersWithIds;

public record GetUsersWithIdsQuery(params Guid[] Ids) : IQuery<IEnumerable<GetUsersWithIdsDto>>;