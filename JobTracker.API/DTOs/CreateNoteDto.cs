namespace JobTracker.API.DTOs;

public class CreateNoteDto
{
    public int JobApplicationId { get; set; }
    public string Content { get; set; } = string.Empty;
}
