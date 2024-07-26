public class CinemaHalls
{
    public int CinemaHallId { get; set; }
    public int StallId { get; set; }
    public Stalls Stall { get; set; } 
    public string Name { get; set; }
    public int TotalSeats { get; set; }
    public ICollection<ShowTimes> ShowTimes { get; set; } 

    public CinemaHalls()
    {
        ShowTimes = new List<ShowTimes>();
    }
}
