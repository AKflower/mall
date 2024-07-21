using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class AdminsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Admins
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Admins>>> GetAdmins()
    {
        return await _context.Admins.ToListAsync();
    }

    // GET: api/Admins/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Admins>> GetAdmin(int id)
    {
        var Admin = await _context.Admins.FindAsync(id);

        if (Admin == null)
        {
            return NotFound();
        }

        return Admin;
    }

    // POST: api/Admins
    [HttpPost]
    public async Task<ActionResult<Admins>> PostAdmin(Admins Admin)
    {
        _context.Admins.Add(Admin);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAdmin), new { id = Admin.AdminId }, Admin);
    }

    // PUT: api/Admins/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAdmin(int id, Admins Admin)
    {
        if (id != Admin.AdminId)
        {
            return BadRequest();
        }

        _context.Entry(Admin).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AdminExists(id))
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

    // DELETE: api/Admins/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAdmin(int id)
    {
        var Admin = await _context.Admins.FindAsync(id);
        if (Admin == null)
        {
            return NotFound();
        }

        _context.Admins.Remove(Admin);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AdminExists(int id)
    {
        return _context.Admins.Any(e => e.AdminId == id);
    }
}
