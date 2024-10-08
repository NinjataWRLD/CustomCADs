﻿using CustomCADs.Domain.Entities;
using CustomCADs.Domain.Enums;
using System.Linq.Expressions;

namespace CustomCADs.Application.Helpers
{
    public static class Filterer
    {
        public static IQueryable<Cad> Filter(this IQueryable<Cad> query, string? user = null, string? status = null, Expression<Func<Cad, bool>>? customFilter = null)
        {
            if (user != null)
            {
                query = query.Where(c => c.Creator.UserName == user);
            }
            if (status != null && Enum.TryParse(status, ignoreCase: true, out CadStatus cadStatus))
            {
                query = query.Where(c => c.Status == cadStatus);
            }
            if (customFilter != null)
            {
                query = query.Where(customFilter);
            }

            return query;
        }
        
        public static IQueryable<Order> Filter(this IQueryable<Order> query, string? user = null, string? status = null, Expression<Func<Order, bool>>? customFilter = null)
        {
            if (user != null)
            {
                query = query.Where(o => o.Buyer.UserName == user);
            }
            if (status != null && Enum.TryParse(status, ignoreCase: true, out OrderStatus orderStatus))
            {
                query = query.Where(o => o.Status == orderStatus);
            }
            if (customFilter != null)
            {
                query = query.Where(customFilter);
            }

            return query;
        }
        
        public static IQueryable<Category> Filter(this IQueryable<Category> query, Expression<Func<Category, bool>>? customFilter = null)
        {
            if (customFilter != null)
            {
                query = query.Where(customFilter);
            }

            return query;
        }
        
        public static IQueryable<User> Filter(this IQueryable<User> query, bool? hasRT = null, Expression<Func<User, bool>>? customFilter = null)
        {
            if (hasRT.HasValue)
            {
                query = query.Where(u => hasRT.Value ? u.RefreshToken != null : u.RefreshToken == null);
            }
            if (customFilter != null)
            {
                query = query.Where(customFilter);
            }

            return query;
        }
        
        public static IQueryable<Role> Filter(this IQueryable<Role> query, Expression<Func<Role, bool>>? customFilter = null)
        {
            if (customFilter != null)
            {
                query = query.Where(customFilter);
            }

            return query;
        }

    }
}
