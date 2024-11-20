﻿// <auto-generated />
using System;
using System.Collections.Generic;
using CustomCADs.Catalog.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CustomCADs.Catalog.Persistence.Migrations
{
    [DbContext(typeof(CatalogContext))]
    [Migration("20241120174742_Updated_Image_Again")]
    partial class Updated_Image_Again
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("Catalog")
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CustomCADs.Catalog.Domain.Categories.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("Name");

                    b.HasKey("Id");

                    b.ToTable("Categories", "Catalog");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Animals"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Characters"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Electronics"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Fashion"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Furniture"
                        },
                        new
                        {
                            Id = 6,
                            Name = "Nature"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Science"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Sports"
                        },
                        new
                        {
                            Id = 9,
                            Name = "Toys"
                        },
                        new
                        {
                            Id = 10,
                            Name = "Vehicles"
                        },
                        new
                        {
                            Id = 11,
                            Name = "Others"
                        });
                });

            modelBuilder.Entity("CustomCADs.Catalog.Domain.Products.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CadId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("CadId");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int")
                        .HasColumnName("CategoryId");

                    b.Property<Guid>("CreatorId")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("CreatorId");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(750)
                        .HasColumnType("nvarchar(750)")
                        .HasColumnName("Description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(18)
                        .HasColumnType("nvarchar(18)")
                        .HasColumnName("Name");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Status");

                    b.Property<DateTime>("UploadDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("UploadDate");

                    b.ComplexProperty<Dictionary<string, object>>("Image", "CustomCADs.Catalog.Domain.Products.Product.Image#Image", b1 =>
                        {
                            b1.IsRequired();

                            b1.Property<string>("ContentType")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)")
                                .HasColumnName("ImageContentType");

                            b1.Property<string>("Key")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)")
                                .HasColumnName("ImageKey");
                        });

                    b.ComplexProperty<Dictionary<string, object>>("Price", "CustomCADs.Catalog.Domain.Products.Product.Price#Money", b1 =>
                        {
                            b1.IsRequired();

                            b1.Property<decimal>("Amount")
                                .HasPrecision(18, 2)
                                .HasColumnType("decimal(18,2)")
                                .HasColumnName("PriceAmount");

                            b1.Property<string>("Currency")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)")
                                .HasColumnName("PriceCurrency");

                            b1.Property<int>("Precision")
                                .HasColumnType("int")
                                .HasColumnName("PricePrecision");

                            b1.Property<string>("Symbol")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)")
                                .HasColumnName("PriceSymbol");
                        });

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products", "Catalog");
                });

            modelBuilder.Entity("CustomCADs.Catalog.Domain.Products.Product", b =>
                {
                    b.HasOne("CustomCADs.Catalog.Domain.Categories.Category", null)
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}