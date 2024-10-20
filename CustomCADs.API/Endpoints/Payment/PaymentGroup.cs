﻿using FastEndpoints;
using static CustomCADs.Domain.Roles.RoleConstants;

namespace CustomCADs.API.Endpoints.Payment;

using static StatusCodes;

public class PaymentGroup : Group
{
    public PaymentGroup()
    {
        Configure("Payment", ep =>
        {
            ep.Roles(Client);
            ep.Description(opt =>
            {
                opt.WithTags("Payment");
                opt.ProducesProblem(Status401Unauthorized);
                opt.ProducesProblem(Status403Forbidden);
                opt.ProducesProblem(Status500InternalServerError);
            });
        });
    }
}
