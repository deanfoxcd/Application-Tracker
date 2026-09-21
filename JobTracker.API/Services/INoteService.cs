using JobTracker.API.Models;

namespace JobTracker.API.Services;

public interface INoteService
{
    Task<IEnumerable<Note>> GetAllAsync();
    Task<Note?> GetByIdAsync(int id);
    Task<Note> CreateAsync(Note note);
    Task UpdateAsync(int id, Note note);
    Task DeleteAsync(int id);
    Task<IEnumerable<Note>> GetByJobApplicationIdAsync(int jobApplicationId);
}
