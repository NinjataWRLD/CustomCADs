﻿using CustomCADs.Carts.Domain.Carts;
using CustomCADs.Carts.Domain.Carts.Entities;
using Microsoft.EntityFrameworkCore;

namespace CustomCADs.Carts.Persistence;

public class CartsContext(DbContextOptions<CartsContext> opts) : DbContext(opts)
{
    public required DbSet<Cart> Carts { get; set; }
    public required DbSet<CartItem> CartItems { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.HasDefaultSchema("Carts");
        builder.ApplyConfigurationsFromAssembly(CartsPersistenceReference.Assembly);
    }
}
