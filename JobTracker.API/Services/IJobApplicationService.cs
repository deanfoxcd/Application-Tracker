using JobTracker.API.Models;

namespace JobTracker.API.Services;

public interface IJobApplicationService
{
    Task<IEnumerable<JobApplication>> GetAllAsync();
    Task<JobApplication> GetByIdAsync(int id);
    Task<JobApplication> CreateAsync(JobApplication jobApplication);
    Task UpdateAsync(int id, JobApplication application);
    Task DeleteAsync(int id);
}
