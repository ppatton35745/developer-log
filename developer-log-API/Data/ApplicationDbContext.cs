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
        public DbSet<Topic> Topic { get; set; }
    }
}