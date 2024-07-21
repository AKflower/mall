using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MoviesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Movies
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movies>>> GetMovies()
    {
        return await _context.Movies.ToListAsync();
    }

    // GET: api/Movies/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Movies>> GetMovie(int id)
    {
        var Movie = await _context.Movies.FindAsync(id);

        if (Movie == null)
        {
            return NotFound();
        }

        return Movie;
    }

    // POST: api/Movies
    [HttpPost]
    public async Task<ActionResult<Movies>> PostMovie(Movies Movie)
    {
        _context.Movies.Add(Movie);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMovie), new { id = Movie.MovieId }, Movie);
    }

    // PUT: api/Movies/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMovie(int id, Movies Movie)
    {
        if (id != Movie.MovieId)
        {
            return BadRequest();
        }

        _context.Entry(Movie).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MovieExists(id))
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

    // DELETE: api/Movies/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        var Movie = await _context.Movies.FindAsync(id);
        if (Movie == null)
        {
            return NotFound();
        }

        _context.Movies.Remove(Movie);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool MovieExists(int id)
    {
        return _context.Movies.Any(e => e.MovieId == id);
    }
}