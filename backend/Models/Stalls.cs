public class Stalls
{
    public int StallId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ContactInfo { get; set; }
    public int Location { get; set; }
    public int StallTypeId { get; set; }
    public int ImageId { get; set; }
    public bool isTopPick { get; set; } = false;

}
