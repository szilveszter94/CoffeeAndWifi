using CafeAndWifi.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CafeAndWifi.Context;

public class CafeAndWifiContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public DbSet<Cafe> Cafes { get; set; }
    public DbSet<Comment> Comments { get; set; }
    
    public CafeAndWifiContext(DbContextOptions<CafeAndWifiContext> options) : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Cafe)
            .WithMany(cafe => cafe.Comments)
            .HasForeignKey(c => c.CafeId)
            .IsRequired();
    }
}