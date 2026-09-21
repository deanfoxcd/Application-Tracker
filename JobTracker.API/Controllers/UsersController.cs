using JobTracker.API.DTOs;
using JobTracker.API.Models;
using JobTracker.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _service;

    public UsersController(IUserService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        var users = await _service.GetAllAsync();
        var dtos = users.Select(u => new UserDto
        {
            Id = u.Id,
            Email = u.Email,
            CreatedAt = u.CreatedAt,
        });
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetById(int id)
    {
        var user = await _service.GetByIdAsync(id);
        if (user == null)
            return NotFound();
        var dto = new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            CreatedAt = user.CreatedAt,
        };
        return Ok(dto);
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> Create(CreateUserDto dto)
    {
        var user = new User { Email = dto.Email, PasswordHash = dto.Password };

        var created = await _service.CreateAsync(user);
        var responseDto = new UserDto
        {
            Id = created.Id,
            Email = created.Email,
            CreatedAt = created.CreatedAt,
        };
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, responseDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateUserDto dto)
    {
        try
        {
            var user = await _service.GetByIdAsync(id);
            if (user == null)
                return NotFound();

            user.Email = dto.Email;
            user.PasswordHash = dto.Password;

            await _service.UpdateAsync(id, user);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}
