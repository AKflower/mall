public class FeedBacks
{
    public int FeedBackId { get; set; }
    public string? Name { get; set; }
    public string? Content { get; set; }
    public int Rating { get; set; }
    public DateTime CreatedAt { get; set; }

    public FeedBacks()
    {
        CreatedAt = DateTime.UtcNow;
    }
}
