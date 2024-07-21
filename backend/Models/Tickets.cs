public class Tickets
{
    public int TicketId { get; set; }
    public int CinemaHallId { get; set; }
    public int ShowtimeId { get; set; }
    public DateTime BookingTime { get; set; }
    public int SeatNumber { get; set; }
    public string SeatName { get; set; }
    public decimal TotalPrice { get; set; }
}