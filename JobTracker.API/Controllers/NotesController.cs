using JobTracker.API.DTOs;
using JobTracker.API.Models;
using JobTracker.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly INoteService _service;

    public NotesController(INoteService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetAll()
    {
        var notes = await _service.GetAllAsync();
        var dtos = notes.Select(n => new NoteDto
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
        var note = await _service.GetByIdAsync(id);
        if (note == null)
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
        var note = new Note { JobApplicationId = dto.JobApplicationId, Content = dto.Content };

        var created = await _service.CreateAsync(note);
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
            var note = await _service.GetByIdAsync(id);
            if (note == null)
                return NotFound();

            note.Content = dto.Content;

            await _service.UpdateAsync(id, note);
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

    [HttpGet("job-application/{jobApplicationId}")]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetByJobApplicationId(
        int jobApplicationId
    )
    {
        var notes = await _service.GetByJobApplicationIdAsync(jobApplicationId);
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
