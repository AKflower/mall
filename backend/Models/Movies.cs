public class Movies
{
    public int MovieId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public int ImageId { get; set; }

    public Movies()
    {
        ReleaseDate = DateTime.UtcNow;
    }
}
