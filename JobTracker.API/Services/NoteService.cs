using JobTracker.API.Data;
using JobTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Services;

public class NoteService : INoteService
{
    private readonly ApplicationDbContext _context;

    public NoteService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Note>> GetAllAsync()
    {
        return await _context.Note.ToListAsync();
    }

    public async Task<Note?> GetByIdAsync(int id)
    {
        return await _context.Note.FindAsync(id);
    }

    public async Task<Note> CreateAsync(Note note)
    {
        note.CreatedAt = DateTime.UtcNow;
        _context.Note.Add(note);
        await _context.SaveChangesAsync();
        return note;
    }

    public async Task UpdateAsync(int id, Note note)
    {
        var existing = await _context.Note.FindAsync(id);
        if (existing == null)
            throw new KeyNotFoundException($"Note {id} not found");

        existing.Content = note.Content;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var note = await _context.Note.FindAsync(id);
        if (note == null)
            throw new KeyNotFoundException($"Note {id} not found");

        _context.Note.Remove(note);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Note>> GetByJobApplicationIdAsync(int jobApplicationId)
    {
        return await _context.Note.Where(n => n.JobApplicationId == jobApplicationId).ToListAsync();
    }
}
