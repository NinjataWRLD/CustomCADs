﻿namespace CustomCADs.UnitTests.Accounts.Application.Accounts.Commands.Delete.Data;

using static AccountsData;

public class DeleteAccountValidData : DeleteAccountData
{
    public DeleteAccountValidData()
    {
        Add(ValidUsername1);
        Add(ValidUsername2);
        Add(ValidUsername3);
        Add(ValidUsername4);
    }
}