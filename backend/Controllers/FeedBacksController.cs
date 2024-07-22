using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System;

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

    // GET: api/FeedBacks/1
    [HttpGet("rating/{rating}")]
    public async Task<ActionResult<IEnumerable<FeedBacks>>> GetFeedBacksByRating(int rating)
    {
        if (rating < 1 || rating > 5)
        {
            return BadRequest("Rating must be between 1 and 5.");
        }

        var feedbacks = await _context.FeedBacks
                                       .Where(fb => fb.Rating == rating)
                                       .ToListAsync();

        return Ok(feedbacks);
    }

      // API to get feedbacks by date: /api/FeedBacks/bydate?date=2024-07-22
    [HttpGet("bydate")]
    public async Task<ActionResult<IEnumerable<FeedBacks>>> GetFeedBacksByDate(DateTime date)
    {
        var startDate = date.Date;
        var endDate = startDate.AddDays(1);

        var feedbacks = await _context.FeedBacks
            .Where(fb => fb.CreatedAt >= startDate && fb.CreatedAt < endDate)
            .ToListAsync();

        return Ok(feedbacks);
    }

     // API to get total feedbacks by month and year: /api/FeedBacks/totalbymonth?month=7&year=2024
    [HttpGet("totalbymonth")]
    public async Task<ActionResult<int>> GetTotalFeedBacksByMonth(int month, int year)
    {
        // Lấy thời gian bắt đầu và kết thúc của tháng được truyền vào
        var startDate = new DateTime(year, month, 1);
        var endDate = startDate.AddMonths(1);

        // Đếm tổng số feedback trong tháng
        var totalFeedbacks = await _context.FeedBacks
            .CountAsync(fb => fb.CreatedAt >= startDate && fb.CreatedAt < endDate);

        return Ok(totalFeedbacks);
    }

    private bool FeedBackExists(int id)
    {
        return _context.FeedBacks.Any(e => e.FeedBackId == id);
    }
}
