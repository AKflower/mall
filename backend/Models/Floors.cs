public class Floors
{
    public int FloorId { get; set; }
    public int Number { get; set; }
    public int TotalParkings { get; set; }
    public int AvailableParkings { get; set; }
    public ICollection<Stalls> Stalls { get; set; }

    public Floors()
    {
        Stalls = new List<Stalls>();
    }
}