using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using developer_log_API.Models;

namespace developer_log_API.Data {
    public class ApplicationDbContext : IdentityDbContext {
        public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options) : base (options) { }

        public DbSet<User> User { get; set; }
        public DbSet<Resource> Resource { get; set; }
        public DbSet<ResourceAttribute> ResourceAttribute { get; set; }
        public DbSet<ResourceAttributeValue> ResourceAttributeValue { get; set; }
        public DbSet<ResourceTopic> ResourceTopic { get; set; }
        public DbSet<ResourceType> ResourceType { get; set; }
        public DbSet<ResourceTypeAttribute> ResourceTypeAttribute { get; set; }
        public DbSet<Topic> Topic { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            modelBuilder.Entity<Topic>()
                .HasMany(rt => rt.ResourceTopics)
                .WithOne(t => t.Topic)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Resource>()
                .HasMany(rt => rt.ResourceTopics)
                .WithOne(r => r.Resource)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Resource>()
                .HasMany(rt => rt.ResourceAttributeValues)
                .WithOne(r => r.Resource)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ResourceType>()
                .HasMany(rta => rta.ResourceTypeAttributes)
                .WithOne(rt => rt.ResourceType)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ResourceType>()
                .HasMany(r => r.Resources)
                .WithOne(rt => rt.ResourceType)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ResourceTypeAttribute>()
                .HasMany(r => r.ResourceAttributeValues)
                .WithOne(rt => rt.ResourceTypeAttribute)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ResourceAttribute>()
                .HasMany(r => r.ResourceTypeAttributes)
                .WithOne(r => r.ResourceAttribute)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}