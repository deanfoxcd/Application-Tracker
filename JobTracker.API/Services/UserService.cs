using JobTracker.API.Data;
using JobTracker.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> CreateAsync(User user)
    {
        user.CreatedAt = DateTime.UtcNow;
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task UpdateAsync(int id, User user)
    {
        var existing = await _context.Users.FindAsync(id);
        if (existing == null)
            throw new KeyNotFoundException($"User {id} not found");

        existing.Email = user.Email;
        existing.PasswordHash = user.PasswordHash;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            throw new KeyNotFoundException($"User {id} not found");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
}
