﻿using CustomCADs.Shared.Core.Common.TypedIds.Files;

namespace CustomCADs.UnitTests.Files.Application.Images;

using static ImagesData;

public class ImagesBaseUnitTests
{
    protected static readonly ImageId id = new(Guid.NewGuid());
    protected static readonly CancellationToken ct = CancellationToken.None;

    protected static Image CreateImage(string key = ValidKey1, string contentType = ValidContentType1)
        => Image.Create(key, contentType);
}
