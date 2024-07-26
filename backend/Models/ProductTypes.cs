public class ProductTypes
{
    public int ProductTypeId { get; set; }
    public string Name { get; set; }
    public ICollection<Products> Products { get; set; }

    public ProductTypes()
    {
        Products = new List<Products>();
    }

}
