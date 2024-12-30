﻿using CustomCADs.Categories.Application.Categories.SharedQueryHandlers;
using CustomCADs.Categories.Domain.Categories.Reads;
using CustomCADs.Shared.Core.Common;
using CustomCADs.Shared.Core.Common.TypedIds.Categories;
using CustomCADs.Shared.UseCases.Categories.Queries;
using CustomCADs.Shared.UseCases.Images.Queries;

namespace CustomCADs.UnitTests.Categories.Application.Categories.SharedQueries.GetByIds;

using static CategoriesData;

public class GetCategoriesByIdsHandlerUnitTests : CategoriesBaseUnitTests
{
    private readonly Mock<ICategoryReads> reads = new();
    private readonly static CategoryId[] ids = [ValidId1, ValidId2, ValidId3];
    private static readonly (CategoryId Id, string Name)[] categories = [
        (ValidId1, ValidName1),
        (ValidId2, ValidName2),
        (ValidId3, ValidName3),
    ];

    [Fact]
    public async Task Handle_CallsDatabase()
    {
        // Arrange
        reads.Setup(v => v.AllAsync(false, ct)).ReturnsAsync(
            [.. categories.Select(c => CreateCategory(c.Id, c.Name, ValidDescription1))]
        );

        GetCategoriesByIdsQuery query = new(ids);
        GetCategoriesByIdsHandler handler = new(reads.Object);

        // Act
        await handler.Handle(query, ct);

        // Assert
        reads.Verify(v => v.AllAsync(false, ct), Times.Once());
    }

    [Fact]
    public async Task Handle_ShouldReturnProperly()
    {
        // Arrange
        reads.Setup(v => v.AllAsync(false, ct)).ReturnsAsync(
            [.. categories.Select(c => CreateCategory(c.Id, c.Name, ValidDescription1))]
        );

        GetCategoriesByIdsQuery query = new(ids);
        GetCategoriesByIdsHandler handler = new(reads.Object);

        // Act
        var actualCategories = (await handler.Handle(query, ct)).Select(c => (c.Id, c.Name));

        // Assert
        Assert.Equal(actualCategories, categories);
    }
}