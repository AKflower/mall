using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System;

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
    public async Task<ActionResult> GetShowTime(int id)
    {
        // Tìm showtime dựa trên ID
        var showTime = await _context.ShowTimes.FindAsync(id);

        if (showTime == null)
        {
            return NotFound("Không tìm thấy suất chiếu.");
        }

        // Tìm cinema hall dựa trên CinemaHallId
        var cinemaHall = await _context.CinemaHalls.FindAsync(showTime.CinemaHallId);

        if (cinemaHall == null)
        {
            return NotFound("Không tìm thấy phòng chiếu.");
        }

        // Tìm stall dựa trên StallId từ cinema hall
        var stall = await _context.Stalls.FindAsync(cinemaHall.StallId);

        if (stall == null)
        {
            return NotFound("Không tìm thấy quầy chiếu.");
        }

        // Trả về thông tin showtime cùng với StallId và StallName
        var result = new
        {
            ShowTimeId = showTime.ShowTimeId,
            MovieId = showTime.MovieId,
            CinemaHallId = showTime.CinemaHallId,
            CinemaHallName = cinemaHall.Name,
            StartTime = showTime.StartTime,
            EndTime = showTime.EndTime,
            AvailableSeats = showTime.AvailableSeats,
            Price = showTime.Price,
            StallId = stall.StallId,
            StallName = stall.Name
        };

        return Ok(result);
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

    [HttpGet("by-date-and-stall")]
    public ActionResult<List<object>> GetMoviesAndShowTimesByDateAndStall(DateTime date, int stallId)
    {
        try
        {
            // Đặt startDate vào đầu ngày và chuyển đổi sang UTC
            var startDate = date.Date.ToUniversalTime().AddHours(7);

            var endDate = startDate.AddDays(1);

            // Lấy danh sách cinema halls theo stallId
            var cinemaHalls = _context.CinemaHalls
                .Where(ch => ch.StallId == stallId)
                .Select(ch => ch.CinemaHallId)
                .ToList();

            // Lấy danh sách showtimes theo ngày và cinema halls
            var showTimes = _context.ShowTimes
                .Where(st => cinemaHalls.Contains(st.CinemaHallId) &&
                             st.StartTime >= startDate &&
                             st.StartTime < endDate)
                .ToList();

            // Lấy thông tin phim dựa trên MovieId từ ShowTimes
            var movieIds = showTimes.Select(st => st.MovieId).Distinct().ToList();
            var movies = _context.Movies
                .Where(m => movieIds.Contains(m.MovieId))
                .ToDictionary(m => m.MovieId, m => m);

            // Tạo danh sách kết quả bao gồm thông tin phim và showtimes
            var result = movies.Select(m => new
            {
                Movie = m.Value,
                ShowTimes = showTimes
                    .Where(st => st.MovieId == m.Key)
                    .Select(st => new
                    {
                        st.ShowTimeId,
                        st.CinemaHallId,
                        StartTime = st.StartTime.ToUniversalTime(),
                        EndTime = st.EndTime.ToUniversalTime(),
                        st.AvailableSeats,
                        st.Price
                    }).ToList()
            }).ToList();

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Lỗi server nội bộ: " + ex.Message);
        }
    }

    [HttpGet("compare-schedules")]
    public IActionResult CompareShowTimesWithSched(DateTime date, int movieId, int stallId, int cinemaHallId)
    {
        try
        {


            // Chuyển đổi date sang UTC
            DateTime startDateUtc = date.Date.ToUniversalTime().AddHours(7);

            // Lấy danh sách showtime cho movieId và stallId vào ngày được chỉ định
            var movieShowTimes = _context.ShowTimes
                .Where(st => st.MovieId == movieId &&
                             st.StartTime.Date == startDateUtc.Date &&
                             _context.CinemaHalls.Any(ch => ch.CinemaHallId == st.CinemaHallId && ch.StallId == stallId))
                .Select(st => new
                {
                    st.ShowTimeId,
                    st.StartTime,
                    st.EndTime,
                    Reason = 1 // "same film"
                })
                .ToList();

            // Lấy danh sách showtime cho cinemaHallId vào ngày được chỉ định
            var cinemaHallShowTimes = _context.ShowTimes
                .Where(st => st.CinemaHallId == cinemaHallId &&
                             st.StartTime.Date == startDateUtc.Date)
                .Select(st => new
                {
                    st.ShowTimeId,
                    st.StartTime,
                    st.EndTime,
                    Reason = 2 // "same room"
                })
                .ToList();

            // Kết hợp movieShowTimes và cinemaHallShowTimes và loại bỏ các showtime trùng lặp
            var combinedShowTimes = movieShowTimes
                .Union(cinemaHallShowTimes) // Combine both lists
                .GroupBy(st => st.ShowTimeId) // Group by ShowTimeId
                .Select(g => new
                {
                    ShowTimeId = g.Key,
                    StartTime = g.First().StartTime,
                    EndTime = g.First().EndTime,
                    Reason = g.Any(st => st.Reason == 2) ? 2 : 1 // Use reason 2 if any showtime has reason 2
                })
                .ToList();

            return Ok(combinedShowTimes);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }


    private bool ShowTimeExists(int id)
    {
        return _context.ShowTimes.Any(e => e.ShowTimeId == id);
    }
}
