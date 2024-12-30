﻿using CustomCADs.Accounts.Domain.Common.Exceptions.Accounts;
using CustomCADs.UnitTests.Accounts.Domain.Accounts.Properties.FirstName.Data;

namespace CustomCADs.UnitTests.Accounts.Domain.Accounts.Properties.FirstName;

public class AccountFirstNameData : TheoryData<string?>;

public class AccountFirstNameUnitTests : AccountsBaseUnitTests
{
    [Theory]
    [ClassData(typeof(AccountFirstNameValidData))]
    public void SetFirstName_ShouldNotThrowException_WhenfirstNameIsValid(string firstName)
    {
        var account = CreateAccount();

        account.SetFirstName(firstName);
    }

    [Theory]
    [ClassData(typeof(AccountFirstNameValidData))]
    public void SetFirstName_SetsfirstName_WhenUserameIsValid(string firstName)
    {
        var account = CreateAccount();

        account.SetFirstName(firstName);

        Assert.Equal(account.FirstName, firstName);
    }

    [Theory]
    [ClassData(typeof(AccountFirstNameInvalidData))]
    public void SetFirstName_ThrowsException_WhenUserameIsInvalid(string firstName)
    {
        var account = CreateAccount();

        Assert.Throws<AccountValidationException>(() =>
        {
            account.SetFirstName(firstName);
        });
    }
}