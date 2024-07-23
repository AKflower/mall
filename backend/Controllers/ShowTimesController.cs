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
        var cinemaHall = await _context.CinemaHalls.FindAsync(ShowTime.CinemaHallId);

        if (cinemaHall == null)
        {
            return NotFound("Không tìm thấy phòng chiếu.");
        }

        ShowTime.AvailableSeats = cinemaHall.TotalSeats;

        var movie = await _context.Movies.FindAsync(ShowTime.MovieId);

        if (movie == null)
        {
            return NotFound("Không tìm thấy phim.");
        }

        var ts = new TimeSpan(0, movie.Duration, 0);
        ShowTime.EndTime = ShowTime.StartTime.Add(ts);

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

       // API to get showtimes by date: /api/ShowTimes/bydate?date=2024-07-22
    [HttpGet("bydate")]
    public async Task<ActionResult<IEnumerable<ShowTimes>>> GetShowTimesByDate(DateTime date)
    {
        var startDate = date.Date;
        var endDate = startDate.AddDays(1);

        var showTimes = await _context.ShowTimes
            .Where(st => st.StartTime >= startDate && st.StartTime < endDate)
            .ToListAsync();

        return Ok(showTimes);
    }

    [HttpGet("by-date")]
    public ActionResult<List<object>> GetShowTimesByDate(DateTime date, int cinemaHallId)
    {
        try
        {
            // Lấy danh sách showtimes theo ngày và CinemaHallId
            var startDate = date.Date;
            var endDate = startDate.AddDays(1);

            var showTimes = _context.ShowTimes
                .Where(st => st.CinemaHallId == cinemaHallId &&
                             st.StartTime >= startDate &&
                             st.StartTime < endDate)
                .ToList();

            // Lấy thông tin phim dựa trên MovieId từ ShowTimes
            var movieIds = showTimes.Select(st => st.MovieId).Distinct().ToList();
            var movies = _context.Movies
                .Where(m => movieIds.Contains(m.MovieId))
                .ToDictionary(m => m.MovieId, m => m);

            // Tạo danh sách kết quả bao gồm thông tin phim và showtimes
            var result = showTimes.Select(st => new
            {
                st.ShowTimeId,
                st.CinemaHallId,
                st.StartTime,
                st.EndTime,
                st.AvailableSeats,
                st.Price,
                Movie = movies[st.MovieId]
            }).ToList();

            if (result.Count == 0)
            {
                return NotFound("Không có lịch chiếu nào cho ngày và rạp này.");
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Lỗi server nội bộ: " + ex.Message);
        }
    }

    private bool ShowTimeExists(int id)
    {
        return _context.ShowTimes.Any(e => e.ShowTimeId == id);
    }
}
