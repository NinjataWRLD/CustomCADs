﻿namespace CustomCADs.UnitTests.Accounts.Application.Accounts.Commands.Create.Data;

using static AccountsData;

public class CreateAccountHandlerValidData : CreateAccountHandlerData
{
    public CreateAccountHandlerValidData()
    {
        Add(RolesData.ValidName1, ValidUsername1, ValidEmail1, ValidTimeZone1, ValidPassword, ValidFirstName1, ValidLastName1);
        Add(RolesData.ValidName2, ValidUsername2, ValidEmail2, ValidTimeZone2, ValidPassword, ValidFirstName2, ValidLastName2);
        Add(RolesData.ValidName3, ValidUsername3, ValidEmail3, ValidTimeZone1, ValidPassword, ValidFirstName1, ValidLastName1);
        Add(RolesData.ValidName4, ValidUsername4, ValidEmail4, ValidTimeZone2, ValidPassword, ValidFirstName2, ValidLastName2);
    }
}