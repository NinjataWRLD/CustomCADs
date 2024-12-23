﻿namespace CustomCADs.Identity.Domain;

public static class AccountConstants
{
    public const int UsernameMinLength = 2;
    public const int UsernameMaxLength = 20;

    public const int PasswordMinLength = 6;
    public const int PasswordMaxLength = 20;

    public const int JwtDurationInMinutes = 15;
    public const int RtDurationInDays = 7;
}
