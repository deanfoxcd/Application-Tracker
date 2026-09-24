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
public class JobApplicationsController : ControllerBase
{
    private readonly IJobApplicationService _service;

    public JobApplicationsController(IJobApplicationService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobApplication>>> GetAll()
    {
        var applications = await _service.GetAllAsync();
        return Ok(applications);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<JobApplication>> GetById(int id)
    {
        var application = await _service.GetByIdAsync(id);
        if (application == null)
            return NotFound();
        return Ok(application);
    }

    [HttpPost]
    public async Task<ActionResult<JobApplication>> Create(CreateJobApplicationDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var application = new JobApplication
        {
            CompanyName = dto.CompanyName,
            Position = dto.Position,
            Status = dto.Status,
            DateApplied = dto.DateApplied,
            JobUrl = dto.JobUrl,
            UserId = userId,
        };

        var created = await _service.CreateAsync(application);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, UpdateJobApplicationDto dto)
    {
        try
        {
            var application = await _service.GetByIdAsync(id);
            if (application == null)
                return NotFound();

            application.CompanyName = dto.CompanyName;
            application.Position = dto.Position;
            application.Status = dto.Status;
            application.DateApplied = dto.DateApplied;
            application.JobUrl = dto.JobUrl;

            await _service.UpdateAsync(id, application);
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
