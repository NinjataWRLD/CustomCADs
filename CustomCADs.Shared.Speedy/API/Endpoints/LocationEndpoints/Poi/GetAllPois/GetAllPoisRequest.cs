﻿namespace CustomCADs.Shared.Speedy.API.Endpoints.LocationEndpoints.Poi.GetAllPois;

public record GetAllPoisRequest(
    string UserName,
    string Password,
    string? Location,
    long? ClientSystemId
);