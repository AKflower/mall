using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class GalleriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public GalleriesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Galleries
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Galleries>>> GetGalleries()
    {
        return await _context.Galleries.ToListAsync();
    }

    // GET: api/Galleries/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Galleries>> GetImage(int id)
    {
        var Image = await _context.Galleries.FindAsync(id);

        if (Image == null)
        {
            return NotFound();
        }

        return Image;
    }

    // POST: api/Galleries
    [HttpPost]
    public async Task<ActionResult<Galleries>> PostImage(Galleries Image)
    {
        _context.Galleries.Add(Image);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetImage), new { id = Image.ImageId }, Image);
    }

    // PUT: api/Galleries/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutImage(int id, Galleries Image)
    {
        if (id != Image.ImageId)
        {
            return BadRequest();
        }

        _context.Entry(Image).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ImageExists(id))
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

    // DELETE: api/Galleries/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteImage(int id)
    {
        var Image = await _context.Galleries.FindAsync(id);
        if (Image == null)
        {
            return NotFound();
        }

        _context.Galleries.Remove(Image);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        Galleries image;

        using (var memoryStream = new MemoryStream())
        {
            await file.CopyToAsync(memoryStream);
            image = new Galleries
            {
                Name = file.FileName,
                Data = memoryStream.ToArray()
            };

            _context.Galleries.Add(image);
            await _context.SaveChangesAsync();
        }

        return Ok(new { id = image.ImageId });
    }

    [HttpGet("download/{id}")]
    public async Task<IActionResult> Download(int id)
    {
        var image = await _context.Galleries.FindAsync(id);

        if (image == null)
            return NotFound();

        return File(image.Data, "image/jpeg", image.Name);
    }

    private bool ImageExists(int id)
    {
        return _context.Galleries.Any(e => e.ImageId == id);
    }
}
