﻿using CustomCADs.Accounts.Application.Accounts.Commands.Create;
using CustomCADs.UnitTests.Accounts.Application.Accounts.Commands.Create.Data;
using FluentValidation.TestHelper;

namespace CustomCADs.UnitTests.Accounts.Application.Accounts.Commands.Create;

public class CreateAccountValidatorUnitTests : AccountsBaseUnitTests
{
    private readonly CreateAccountValidator validator = new();

    [Theory]
    [ClassData(typeof(CreateAccountValidData))]
    public void Validate_ShouldBeValid_WhenAccountIsValid(string role, string username, string email, string timeZone, string password, string? firstName, string? lastName)
    {
        // Arrange
        CreateAccountCommand command = new(
            Role: role,
            Username: username,
            Email: email,
            TimeZone: timeZone,
            Password: password,
            FirstName: firstName,
            LastName: lastName
        );

        // Act
        var result = validator.TestValidate(new(command));

        // Assert
        Assert.True(result.IsValid);
    }

    [Theory]
    [ClassData(typeof(CreateAccountInvalidUsernameData))]
    [ClassData(typeof(CreateAccountInvalidEmailData))]
    [ClassData(typeof(CreateAccountInvalidTimeZoneData))]
    [ClassData(typeof(CreateAccountInvalidFirstNameData))]
    [ClassData(typeof(CreateAccountInvalidLastNameData))]
    public void Validate_ShouldBeInvalid_WhenAccountIsNotValid(string role, string username, string email, string timeZone, string password, string? firstName, string? lastName)
    {
        // Arrange
        CreateAccountCommand command = new(
            Role: role,
            Username: username,
            Email: email,
            TimeZone: timeZone,
            Password: password,
            FirstName: firstName,
            LastName: lastName
        );

        // Act
        var result = validator.TestValidate(new(command));

        // Assert
        Assert.False(result.IsValid);
    }

    [Theory]
    [ClassData(typeof(CreateAccountInvalidUsernameData))]
    public void Validate_ShouldReturnProperErrors_WhenUsernameIsNotValid(string role, string username, string email, string timeZone, string password, string? firstName, string? lastName)
    {
        // Arrange
        CreateAccountCommand command = new(
            Role: role,
            Username: username,
            Email: email,
            TimeZone: timeZone,
            Password: password,
            FirstName: firstName,
            LastName: lastName
        );

        // Act
        var result = validator.TestValidate(new(command));

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Username);
    }

    [Theory]
    [ClassData(typeof(CreateAccountInvalidEmailData))]
    public void Validate_ShouldReturnProperErrors_WhenEmailIsNotValid(string role, string username, string email, string timeZone, string password, string? firstName, string? lastName)
    {
        // Arrange
        CreateAccountCommand command = new(
            Role: role,
            Username: username,
            Email: email,
            TimeZone: timeZone,
            Password: password,
            FirstName: firstName,
            LastName: lastName
        );

        // Act
        var result = validator.TestValidate(new(command));

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.Email);
    }

    [Theory]
    [ClassData(typeof(CreateAccountInvalidTimeZoneData))]
    public void Validate_ShouldReturnProperErrors_WhenTimeZoneIsNotValid(string role, string username, string email, string timeZone, string password, string? firstName, string? lastName)
    {
        // Arrange
        CreateAccountCommand command = new(
            Role: role,
            Username: username,
            Email: email,
            TimeZone: timeZone,
            Password: password,
            FirstName: firstName,
            LastName: lastName
        );

        // Act
        var result = validator.TestValidate(new(command));

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.TimeZone);
    }

    [Theory]
    [ClassData(typeof(CreateAccountInvalidFirstNameData))]
    public void Validate_ShouldReturnProperErrors_WhenFirstNameIsNotValid(string role, string username, string email, string timeZone, string password, string? firstName, string? lastName)
    {
        // Arrange
        CreateAccountCommand command = new(
            Role: role,
            Username: username,
            Email: email,
            TimeZone: timeZone,
            Password: password,
            FirstName: firstName,
            LastName: lastName
        );

        // Act
        var result = validator.TestValidate(new(command));

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.FirstName);
    }

    [Theory]
    [ClassData(typeof(CreateAccountInvalidLastNameData))]
    public void Validate_ShouldReturnProperErrors_WhenLastNameIsNotValid(string role, string username, string email, string timeZone, string password, string? firstName, string? lastName)
    {
        // Arrange
        CreateAccountCommand command = new(
            Role: role,
            Username: username,
            Email: email,
            TimeZone: timeZone,
            Password: password,
            FirstName: firstName,
            LastName: lastName
        );

        // Act
        var result = validator.TestValidate(new(command));

        // Assert
        result.ShouldHaveValidationErrorFor(x => x.LastName);
    }
}