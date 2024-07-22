using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TicketsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Tickets
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tickets>>> GetTickets()
    {
        return await _context.Tickets.ToListAsync();
    }

    // GET: api/Tickets/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Tickets>> GetTicket(int id)
    {
        var Ticket = await _context.Tickets.FindAsync(id);

        if (Ticket == null)
        {
            return NotFound();
        }

        return Ticket;
    }

    // POST: api/Tickets
    [HttpPost]
    public async Task<ActionResult<Tickets>> PostTicket(Tickets Ticket)
    {
        var showTime = await _context.ShowTimes.FindAsync(Ticket.ShowTimeId);

        if (showTime == null)
        {
            return NotFound("Suất chiếu không tồn tại.");
        }

        if (showTime.AvailableSeats <= 0)
        {
            return BadRequest("Không còn ghế trống.");
        }

        int tens = Ticket.SeatNumber / 10;
        int units = Ticket.SeatNumber % 10;
        char tensChar = (char)('A' + (tens - 1)); 
        string unitsStr;
        if (units == 0) unitsStr = '1' + units.ToString();
        else unitsStr = units.ToString();
        Ticket.SeatName = tensChar.ToString() + unitsStr;
        Ticket.BookingTime = DateTime.UtcNow;
        _context.Tickets.Add(Ticket);

        showTime.AvailableSeats -= 1;

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTicket), new { id = Ticket.TicketId }, Ticket);
    }

    // PUT: api/Tickets/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTicket(int id, Tickets Ticket)
    {
        if (id != Ticket.TicketId)
        {
            return BadRequest();
        }

        _context.Entry(Ticket).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TicketExists(id))
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

    // DELETE: api/Tickets/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        var Ticket = await _context.Tickets.FindAsync(id);
        if (Ticket == null)
        {
            return NotFound();
        }

        _context.Tickets.Remove(Ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }

     // GET: api/tickets/showtime/{showtimeId}/seats
    [HttpGet("showtime/{showtimeId}/seats")]
    public async Task<IActionResult> GetSeatNumbersByShowtime(int showtimeId)
    {
        var seatNumbers = await _context.Tickets
            .Where(ticket => ticket.ShowTimeId == showtimeId)
            .Select(ticket => ticket.SeatNumber)
            .ToListAsync();

        if (seatNumbers == null || !seatNumbers.Any())
        {
            return NotFound("No seats found for the given showtime.");
        }

        return Ok(seatNumbers);
    }

    private bool TicketExists(int id)
    {
        return _context.Tickets.Any(e => e.TicketId == id);
    }
}
