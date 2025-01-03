﻿namespace CustomCADs.UnitTests.Files.Application.Cads.SharedCommands.Create.Data;

using static CadsData;

public class CreateCadInvalidContentTypeData : CreateCadData
{
    public CreateCadInvalidContentTypeData()
    {
        Add(ValidKey1, InvalidContentType);
        Add(ValidKey2, InvalidContentType);
    }
}