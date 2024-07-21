using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }

    // GET: api/Products/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Products>> GetProduct(int id)
    {
        var Product = await _context.Products.FindAsync(id);

        if (Product == null)
        {
            return NotFound();
        }

        return Product;
    }

    // POST: api/Products
    [HttpPost]
    public async Task<ActionResult<Products>> PostProduct(Products Product)
    {
        _context.Products.Add(Product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProduct), new { id = Product.ProductId }, Product);
    }

    // PUT: api/Products/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(int id, Products Product)
    {
        if (id != Product.ProductId)
        {
            return BadRequest();
        }

        _context.Entry(Product).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProductExists(id))
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

    // DELETE: api/Products/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var Product = await _context.Products.FindAsync(id);
        if (Product == null)
        {
            return NotFound();
        }

        _context.Products.Remove(Product);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ProductExists(int id)
    {
        return _context.Products.Any(e => e.ProductId == id);
    }
}
