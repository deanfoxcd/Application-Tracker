namespace JobTracker.API.DTOs;

public class UpdateJobApplicationDto
{
    public string CompanyName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime DateApplied { get; set; }
    public string? JobUrl { get; set; }
}
