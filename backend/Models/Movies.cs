public class Movies
{
    public int MovieId { get; set; }
    public int StallId { get; set; }
    public Stalls Stall { get; set; } 
    public string Title { get; set; }
    public string Description { get; set; }
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public int ImageId { get; set; }
    public Galleries Gallery { get; set; }
    public bool IsDelete { get; set; } = false;
    public ICollection<ShowTimes> ShowTimes { get; set; } 

    public Movies()
    {
        ReleaseDate = DateTime.UtcNow;
        ShowTimes = new List<ShowTimes>();
    }
}
