using JobTracker.API.Data;
using JobTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Services;

public class JobApplicationService : IJobApplicationService
{
    private readonly ApplicationDbContext _context;

    public JobApplicationService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<JobApplication>> GetAllAsync()
    {
        return await _context.JobApplications.ToListAsync();
    }

    public async Task<JobApplication> GetByIdAsync(int id)
    {
        return await _context.JobApplications.FindAsync(id);
    }

    public async Task<JobApplication> CreateAsync(JobApplication application)
    {
        application.CreatedAt = DateTime.UtcNow;
        application.UpdatedAt = DateTime.UtcNow;
        _context.JobApplications.Add(application);
        await _context.SaveChangesAsync();
        return application;
    }

    public async Task UpdateAsync(int id, JobApplication application)
    {
        var existing = await _context.JobApplications.FindAsync(id);
        if (existing == null)
            throw new KeyNotFoundException($"Application {id} not found");

        existing.CompanyName = application.CompanyName;
        existing.Position = application.Position;
        existing.Status = application.Status;
        existing.DateApplied = application.DateApplied;
        existing.JobUrl = application.JobUrl;
        existing.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var application = await _context.JobApplications.FindAsync(id);
        if (application == null)
            throw new KeyNotFoundException($"Application {id} not found");

        _context.JobApplications.Remove(application);
        await _context.SaveChangesAsync();
    }
}
