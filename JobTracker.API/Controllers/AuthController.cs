using JobTracker.API.Data;
using JobTracker.API.DTOs;
using JobTracker.API.Models;
using JobTracker.API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly ApplicationDbContext _context;

    public AuthController(ITokenService tokenService, ApplicationDbContext context)
    {
        _tokenService = tokenService;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<string>> Register(RegisterDto dto)
    {
        var existing = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (existing != null)
            return BadRequest("User with this email already exists.");

        var user = new User { Email = dto.Email, CreatedAt = DateTime.UtcNow };
        var hasher = new PasswordHasher<User>();
        user.PasswordHash = hasher.HashPassword(user, dto.Password);

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _tokenService.GenerateToken(user);
        return Ok(token);
    }
}
