using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class FeedBacksController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FeedBacksController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/FeedBacks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FeedBacks>>> GetFeedBacks()
    {
        return await _context.FeedBacks.ToListAsync();
    }

    // GET: api/FeedBacks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<FeedBacks>> GetFeedBack(int id)
    {
        var FeedBack = await _context.FeedBacks.FindAsync(id);

        if (FeedBack == null)
        {
            return NotFound();
        }

        return FeedBack;
    }

    // POST: api/FeedBacks
    [HttpPost]
    public async Task<ActionResult<FeedBacks>> PostFeedBack(FeedBacks FeedBack)
    {
        _context.FeedBacks.Add(FeedBack);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFeedBack), new { id = FeedBack.FeedBackId }, FeedBack);
    }

    // PUT: api/FeedBacks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutFeedBack(int id, FeedBacks FeedBack)
    {
        if (id != FeedBack.FeedBackId)
        {
            return BadRequest();
        }

        _context.Entry(FeedBack).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FeedBackExists(id))
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

    // DELETE: api/FeedBacks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFeedBack(int id)
    {
        var FeedBack = await _context.FeedBacks.FindAsync(id);
        if (FeedBack == null)
        {
            return NotFound();
        }

        _context.FeedBacks.Remove(FeedBack);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool FeedBackExists(int id)
    {
        return _context.FeedBacks.Any(e => e.FeedBackId == id);
    }
}
