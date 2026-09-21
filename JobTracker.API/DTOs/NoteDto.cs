namespace JobTracker.API.DTOs;

public class NoteDto
{
    public int Id { get; set; }
    public int JobApplicationId { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
