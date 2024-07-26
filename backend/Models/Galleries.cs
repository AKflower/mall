public class Galleries
{
    public int ImageId { get; set; }
    public string Name { get; set; }
    public byte[] Data { get; set; }
    public DateTime UploadedAt { get; set; }
    public ICollection<Movies> Movies { get; set; }
    public ICollection<Products> Products { get; set; }
    public ICollection<Stalls> Stalls { get; set; }

    public Galleries()
    {
        Stalls = new List<Stalls>();
        Products = new List<Products>();
        Movies = new List<Movies>();
    }
}
