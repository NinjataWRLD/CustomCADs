﻿using CustomCADs.Carts.Endpoints.Helpers;

#pragma warning disable IDE0130
namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddGalleryExceptionHandler(this IServiceCollection services)
        => services.AddExceptionHandler<GlobalExceptionHandler>();
}