using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class CinemaHallsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CinemaHallsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/CinemaHalls
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CinemaHalls>>> GetCinemaHalls()
    {
        return await _context.CinemaHalls.ToListAsync();
    }

    // GET: api/CinemaHalls/5
    [HttpGet("{id}")]
    public async Task<ActionResult<CinemaHalls>> GetCinemaHall(int id)
    {
        var CinemaHall = await _context.CinemaHalls.FindAsync(id);

        if (CinemaHall == null)
        {
            return NotFound();
        }

        return CinemaHall;
    }

    // POST: api/CinemaHalls
    [HttpPost]
    public async Task<ActionResult<CinemaHalls>> PostCinemaHall(CinemaHalls CinemaHall)
    {
        _context.CinemaHalls.Add(CinemaHall);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCinemaHall), new { id = CinemaHall.CinemaHallId }, CinemaHall);
    }

    // PUT: api/CinemaHalls/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCinemaHall(int id, CinemaHalls CinemaHall)
    {
        if (id != CinemaHall.CinemaHallId)
        {
            return BadRequest();
        }

        _context.Entry(CinemaHall).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CinemaHallExists(id))
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

    // DELETE: api/CinemaHalls/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCinemaHall(int id)
    {
        var CinemaHall = await _context.CinemaHalls.FindAsync(id);
        if (CinemaHall == null)
        {
            return NotFound();
        }

        _context.CinemaHalls.Remove(CinemaHall);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CinemaHallExists(int id)
    {
        return _context.CinemaHalls.Any(e => e.CinemaHallId == id);
    }
}
