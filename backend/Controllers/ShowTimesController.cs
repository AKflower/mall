using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ShowTimesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ShowTimesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/ShowTimes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShowTimes>>> GetShowTimes()
    {
        return await _context.ShowTimes.ToListAsync();
    }

    // GET: api/ShowTimes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ShowTimes>> GetShowTime(int id)
    {
        var ShowTime = await _context.ShowTimes.FindAsync(id);

        if (ShowTime == null)
        {
            return NotFound();
        }

        return ShowTime;
    }

    // POST: api/ShowTimes
    [HttpPost]
    public async Task<ActionResult<ShowTimes>> PostShowTime(ShowTimes ShowTime)
    {
        _context.ShowTimes.Add(ShowTime);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetShowTime), new { id = ShowTime.ShowTimeId }, ShowTime);
    }

    // PUT: api/ShowTimes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutShowTime(int id, ShowTimes ShowTime)
    {
        if (id != ShowTime.ShowTimeId)
        {
            return BadRequest();
        }

        _context.Entry(ShowTime).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ShowTimeExists(id))
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

    // DELETE: api/ShowTimes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteShowTime(int id)
    {
        var ShowTime = await _context.ShowTimes.FindAsync(id);
        if (ShowTime == null)
        {
            return NotFound();
        }

        _context.ShowTimes.Remove(ShowTime);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ShowTimeExists(int id)
    {
        return _context.ShowTimes.Any(e => e.ShowTimeId == id);
    }
}
