public class ShowTimes
{
    public int ShowTimeId { get; set; }
    public int MovieId { get; set; }
    public Movies Movie { get; set; } 
    public int CinemaHallId { get; set; }
    public CinemaHalls CinemaHall { get; set; } 
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int AvailableSeats { get; set; }
    public decimal Price { get; set; }
    public ICollection<Tickets> Tickets { get; set; }

    public ShowTimes()
    {
        Tickets = new List<Tickets>();
    }
}
