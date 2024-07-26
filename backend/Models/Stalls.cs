public class Stalls
{
    public int StallId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ContactInfo { get; set; }
    public string Parking { get; set; }
    public int FloorId { get; set; }
    public Floors Floor { get; set; }
    public int StallTypeId { get; set; }
    public StallTypes StallType { get; set; }
    public int ImageId { get; set; }
    public Galleries Gallery { get; set; }
    public bool isTopPick { get; set; } = false;
    public ICollection<CinemaHalls> CinemaHalls { get; set; }
    public ICollection<Movies> Movies { get; set; }
    public ICollection<Products> Products { get; set; }

    public Stalls()
    {
        Products = new List<Products>();
        Movies = new List<Movies>();
        CinemaHalls = new List<CinemaHalls>();
    }
}
