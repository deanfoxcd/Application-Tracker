namespace JobTracker.API.DTOs;

public class JobApplicationDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime DateApplied { get; set; }
    public string? JobUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
