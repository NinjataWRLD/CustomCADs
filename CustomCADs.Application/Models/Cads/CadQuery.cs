﻿using CustomCADs.Domain.Enums;

namespace CustomCADs.Application.Models.Cads
{
    public class CadQuery
    {
        public string? Creator { get; set; }
        public CadStatus? Status { get; set; }
    }
}
