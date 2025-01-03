﻿using CustomCADs.Files.Application.Images.SharedCommandHandlers.SetContentType;
using CustomCADs.Files.Domain.Common;
using CustomCADs.Files.Domain.Images.Reads;
using CustomCADs.Shared.UseCases.Images.Commands;
using CustomCADs.UnitTests.Files.Application.Images.SharedCommands.SetContentType.Data;

namespace CustomCADs.UnitTests.Files.Application.Images.SharedCommands.SetContentType;

using static ImagesData;

public class SetImageContentTypeHandlerData : TheoryData<string>;

public class SetImageContentTypeHandlerUnitTests : ImagesBaseUnitTests
{
    private readonly IImageReads reads = Substitute.For<IImageReads>();
    private readonly IUnitOfWork uow = Substitute.For<IUnitOfWork>();
    private readonly Image image = CreateImage();

    [Theory]
    [ClassData(typeof(SetImageContentTypeHandlerValidData))]
    public async Task Handle_ShouldCallDatabase(string contentType)
    {
        // Arrange
        reads.SingleByIdAsync(id, true, ct).Returns(image);

        SetImageContentTypeCommand command = new(id, contentType);
        SetImageContentTypeHandler handler = new(reads, uow);

        // Act
        await handler.Handle(command, ct);

        // Assert
        await reads.Received(1).SingleByIdAsync(id, true, ct);
        await uow.Received(1).SaveChangesAsync(ct);
    }

    [Theory]
    [ClassData(typeof(SetImageContentTypeHandlerValidData))]
    public async Task Handle_ShouldModifyImage(string contentType)
    {
        // Arrange
        reads.SingleByIdAsync(id, true, ct).Returns(image);

        SetImageContentTypeCommand command = new(id, contentType);
        SetImageContentTypeHandler handler = new(reads, uow);

        // Act
        await handler.Handle(command, ct);

        // Assert
        Assert.Equal(contentType, image.ContentType);
    }
}
