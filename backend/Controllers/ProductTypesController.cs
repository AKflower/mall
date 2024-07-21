using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ProductTypesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductTypesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/ProductTypes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductTypes>>> GetProductTypes()
    {
        return await _context.ProductTypes.ToListAsync();
    }

    // GET: api/ProductTypes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductTypes>> GetProductType(int id)
    {
        var ProductType = await _context.ProductTypes.FindAsync(id);

        if (ProductType == null)
        {
            return NotFound();
        }

        return ProductType;
    }

    // POST: api/ProductTypes
    [HttpPost]
    public async Task<ActionResult<ProductTypes>> PostProductType(ProductTypes ProductType)
    {
        _context.ProductTypes.Add(ProductType);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProductType), new { id = ProductType.ProductTypeId }, ProductType);
    }

    // PUT: api/ProductTypes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProductType(int id, ProductTypes ProductType)
    {
        if (id != ProductType.ProductTypeId)
        {
            return BadRequest();
        }

        _context.Entry(ProductType).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductTypeExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/ProductTypes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProductType(int id)
    {
        var ProductType = await _context.ProductTypes.FindAsync(id);
        if (ProductType == null)
        {
            return NotFound();
        }

        _context.ProductTypes.Remove(ProductType);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProductTypeExists(int id)
    {
        return _context.ProductTypes.Any(e => e.ProductTypeId == id);
    }
}
