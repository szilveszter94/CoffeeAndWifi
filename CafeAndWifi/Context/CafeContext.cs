using CafeAndWifi.Model;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

namespace CafeAndWifi.Context;

public class CafeContext : DbContext
{
    public DbSet<Cafe> Cafes { get; set; }
    public DbSet<Comment> Comments { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        Env.Load();
        var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
        options.UseSqlServer(connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Define the relationship between Cafe and Comment
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Cafe)
            .WithMany(cafe => cafe.Comments)
            .HasForeignKey(c => c.CafeId)
            .IsRequired();
    }
}