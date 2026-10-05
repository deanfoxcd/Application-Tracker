using System.Security.Claims;
using JobTracker.API.DTOs;
using JobTracker.API.Models;
using JobTracker.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotesController : ControllerBase
{
    private readonly INoteService _noteService;
    private readonly IJobApplicationService _jobApplicationService;

    public NotesController(INoteService noteService, IJobApplicationService jobApplicationService)
    {
        _noteService = noteService;
        _jobApplicationService = jobApplicationService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetAll()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var myApplicationIds = (await _jobApplicationService.GetAllAsync())
            .Where(a => a.UserId == userId)
            .Select(a => a.Id)
            .ToHashSet();

        var notes = await _noteService.GetAllAsync();
        var dtos = notes
            .Where(n => myApplicationIds.Contains(n.JobApplicationId))
            .Select(n => new NoteDto
            {
                Id = n.Id,
                JobApplicationId = n.JobApplicationId,
                Content = n.Content,
                CreatedAt = n.CreatedAt,
            });
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NoteDto>> GetById(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var note = await _noteService.GetByIdAsync(id);
        if (note == null)
            return NotFound();
        var application = await _jobApplicationService.GetByIdAsync(note.JobApplicationId);
        if (application == null || application.UserId != userId)
            return NotFound();

        var dto = new NoteDto
        {
            Id = note.Id,
            JobApplicationId = note.JobApplicationId,
            Content = note.Content,
            CreatedAt = note.CreatedAt,
        };
        return Ok(dto);
    }

    [HttpPost]
    public async Task<ActionResult<NoteDto>> Create(CreateNoteDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var application = await _jobApplicationService.GetByIdAsync(dto.JobApplicationId);
        if (application == null || application.UserId != userId)
            return NotFound();

        var note = new Note { JobApplicationId = dto.JobApplicationId, Content = dto.Content };

        var created = await _noteService.CreateAsync(note);
        var responseDto = new NoteDto
        {
            Id = created.Id,
            JobApplicationId = created.JobApplicationId,
            Content = created.Content,
            CreatedAt = created.CreatedAt,
        };
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, responseDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateNoteDto dto)
    {
        try
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var note = await _noteService.GetByIdAsync(id);
            if (note == null)
                return NotFound();
            var application = await _jobApplicationService.GetByIdAsync(note.JobApplicationId);
            if (application == null || application.UserId != userId)
                return NotFound();

            note.Content = dto.Content;

            await _noteService.UpdateAsync(id, note);
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
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var note = await _noteService.GetByIdAsync(id);
            if (note == null)
                return NotFound();
            var application = await _jobApplicationService.GetByIdAsync(note.JobApplicationId);
            if (application == null || application.UserId != userId)
                return NotFound();

            await _noteService.DeleteAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("job-application/{jobApplicationId}")]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetByJobApplicationId(
        int jobApplicationId
    )
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var application = await _jobApplicationService.GetByIdAsync(jobApplicationId);
        if (application == null || application.UserId != userId)
            return NotFound();

        var notes = await _noteService.GetByJobApplicationIdAsync(jobApplicationId);
        var dtos = notes.Select(n => new NoteDto
        {
            Id = n.Id,
            JobApplicationId = n.JobApplicationId,
            Content = n.Content,
            CreatedAt = n.CreatedAt,
        });
        return Ok(dtos);
    }
}
