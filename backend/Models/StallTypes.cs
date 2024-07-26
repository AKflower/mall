public class StallTypes
{
    public int StallTypeId { get; set; }
    public string Name { get; set; }
    public ICollection<Stalls> Stalls { get; set; }

    public StallTypes()
    {
        Stalls = new List<Stalls>();
    }

}
