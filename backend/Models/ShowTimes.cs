public class ShowTimes
{
    public int ShowTimeId { get; set; }
    public int MovieId { get; set; }
    public int CinemaHallId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int AvailableSeats { get; set; }
}
