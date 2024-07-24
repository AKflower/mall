using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class FloorsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FloorsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Floors
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Floors>>> GetFloors()
    {
        return await _context.Floors.ToListAsync();
    }

    // GET: api/Floors/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Floors>> GetFloor(int id)
    {
        var floor = await _context.Floors.FindAsync(id);

        if (floor == null)
        {
            return NotFound();
        }

        return floor;
    }

    // GET: api/Floors/4/available
    [HttpGet("{floorId}/available")]
    public async Task<ActionResult<IEnumerable<string>>> GetAvailable(int floorId)
    {

        var floor = await _context.Floors.FindAsync(floorId);

        var parkings = _context.Stalls
            .Where(stall => stall.FloorId == floorId)
            .Select(stall => stall.Parking)
            .Distinct()
            .ToList();


        List<string> all = new List<string>();

        for (int i = 0; i < floor.TotalParkings; i++)
        {
            char unit = (char)('A' + i);
            string parkingSpot = floor.Number.ToString() + unit;
            all.Add(parkingSpot);
        }

        var availableParkings = all.Except(parkings).ToList();

        return Ok(availableParkings);
    }


    // POST: api/Floors
    [HttpPost]
    public async Task<ActionResult<Floors>> PostFloor(Floors floor)
    {
        _context.Floors.Add(floor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFloor), new { id = floor.FloorId }, floor);
    }

    // PUT: api/Floors/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutFloor(int id, Floors floor)
    {
        if (id != floor.FloorId)
        {
            return BadRequest();
        }

        _context.Entry(floor).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FloorExists(id))
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

    // DELETE: api/Floors/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFloor(int id)
    {
        var floor = await _context.Floors.FindAsync(id);
        if (floor == null)
        {
            return NotFound();
        }

        _context.Floors.Remove(floor);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool FloorExists(int id)
    {
        return _context.Floors.Any(e => e.FloorId == id);
    }
}