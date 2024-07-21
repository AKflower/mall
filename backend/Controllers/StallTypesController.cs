using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class StallTypesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StallTypesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/StallTypes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StallTypes>>> GetStallTypes()
    {
        return await _context.StallTypes.ToListAsync();
    }

    // GET: api/StallTypes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<StallTypes>> GetStallType(int id)
    {
        var StallType = await _context.StallTypes.FindAsync(id);

        if (StallType == null)
        {
            return NotFound();
        }

        return StallType;
    }

    // POST: api/StallTypes
    [HttpPost]
    public async Task<ActionResult<StallTypes>> PostStallType(StallTypes StallType)
    {
        _context.StallTypes.Add(StallType);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStallType), new { id = StallType.StallTypeId }, StallType);
    }

    // PUT: api/StallTypes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutStallType(int id, StallTypes StallType)
    {
        if (id != StallType.StallTypeId)
        {
            return BadRequest();
        }

        _context.Entry(StallType).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!StallTypeExists(id))
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

    // DELETE: api/StallTypes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStallType(int id)
    {
        var StallType = await _context.StallTypes.FindAsync(id);
        if (StallType == null)
        {
            return NotFound();
        }

        _context.StallTypes.Remove(StallType);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool StallTypeExists(int id)
    {
        return _context.StallTypes.Any(e => e.StallTypeId == id);
    }
}
