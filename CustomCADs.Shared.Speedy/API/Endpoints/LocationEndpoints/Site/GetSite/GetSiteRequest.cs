﻿namespace CustomCADs.Shared.Speedy.API.Endpoints.LocationEndpoints.Site.GetSite;

public record GetSiteRequest(
    string UserName,
    string Password,
    string? Location,
    long? ClientSystemId
);