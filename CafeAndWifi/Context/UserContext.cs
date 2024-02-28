using DotNetEnv;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CafeAndWifi.Context;

public class UserContext
{
    public class UsersContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public UsersContext (DbContextOptions<UsersContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            Env.Load();
            var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
            options.UseSqlServer(connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}