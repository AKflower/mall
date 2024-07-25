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
    public async Task<ActionResult<IEnumerable<Stalls>>> GetStalls([FromQuery] int? stallTypeId = null)
    {
        List<Stalls> stalls;

        if (stallTypeId.HasValue)
        {
            // Lọc theo StallTypeId
            stalls = await _context.Stalls
                .Where(s => s.StallTypeId == stallTypeId.Value)
                .ToListAsync();
        }
        else
        {
            // Trả về tất cả stalls
            stalls = await _context.Stalls.ToListAsync();
        }

        if (stalls == null || stalls.Count == 0)
        {
            return NotFound("No stalls found.");
        }

        return Ok(stalls);
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
                Parking = s.Parking,
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
    // POST: api/stalls
    [HttpPost]
    public async Task<IActionResult> AddStall([FromBody] Stalls newStall)
    {

        var floor = await _context.Floors.FindAsync(newStall.FloorId);

        _context.Stalls.Add(newStall);
        await _context.SaveChangesAsync();

        floor.AvailableParkings -= 1;
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStall), new { id = newStall.StallId }, newStall);
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
    [HttpDelete("{stallId}")]
    public async Task<IActionResult> DeleteStall(int stallId)
    {
        try
        {
            var stall = await _context.Stalls.FindAsync(stallId);

            var products = _context.Products.Where(p => p.StallId == stallId).ToList();

            _context.Products.RemoveRange(products);

            _context.Stalls.Remove(stall);

            await _context.SaveChangesAsync();

            return Ok(stallId);
        }
        catch (Exception ex)
        {
            return Ok(0);
        }
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
