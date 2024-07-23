using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class StallsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StallsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Stalls
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Stalls>>> GetStalls()
    {
        return await _context.Stalls.ToListAsync();
    }

     // GET: api/Stalls/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetStall(int id)
    {
        var stall = await _context.Stalls
            .Where(s => s.StallId == id)
            .Select(s => new
            {
                StallId = s.StallId,
                Name = s.Name,
                Description = s.Description,
                ContactInfo = s.ContactInfo,
                Location = s.Location,
                StallTypeId = s.StallTypeId,
                ImageId = s.ImageId,
                isTopPick = s.isTopPick,
                Products = _context.Products
                    .Where(p => p.StallId == s.StallId)
                    .ToList()
            })
            .SingleOrDefaultAsync();

        if (stall == null)
        {
            return NotFound();
        }

        return Ok(stall);
    }
    // POST: api/Stalls
    [HttpPost]
    public async Task<ActionResult<Stalls>> PostStall(Stalls Stall)
    {
        _context.Stalls.Add(Stall);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStall), new { id = Stall.StallId }, Stall);
    }

    // PUT: api/Stalls/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutStall(int id, Stalls Stall)
    {
        if (id != Stall.StallId)
        {
            return BadRequest();
        }

        _context.Entry(Stall).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!StallExists(id))
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

    // DELETE: api/Stalls/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStall(int id)
    {
        var Stall = await _context.Stalls.FindAsync(id);
        if (Stall == null)
        {
            return NotFound();
        }

        _context.Stalls.Remove(Stall);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: api/Stalls/TopPicks
    [HttpGet("TopPicks")]
    public async Task<ActionResult<IEnumerable<Stalls>>> GetTopPickStalls()
    {
        var topPickStalls = await _context.Stalls
            .Where(s => s.isTopPick == true)
            .ToListAsync();

        if (!topPickStalls.Any())
        {
            return NotFound("No top pick stalls found.");
        }

        return Ok(topPickStalls);
    }

    private bool StallExists(int id)
    {
        return _context.Stalls.Any(e => e.StallId == id);
    }
}
