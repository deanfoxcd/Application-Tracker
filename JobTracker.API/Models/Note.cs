namespace JobTracker.API.Models;

public class Note
{
    public int Id { get; set; }
    public int JobApplicationId { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public JobApplication? JobApplication { get; set; }
}
