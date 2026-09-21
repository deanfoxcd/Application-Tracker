using JobTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<JobApplication> JobApplications { get; set; }
    public DbSet<Note> Note { get; set; }
}
