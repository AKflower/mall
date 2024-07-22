using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        var admin = _context.Admins.SingleOrDefault(a => a.Email == loginRequest.Email);
        if (admin == null || !VerifyPassword(loginRequest.Password, admin.PasswordHash))
        {
            return Unauthorized("Invalid email or password.");
        }

        // Tạo JWT token
        var token = GenerateJwtToken(admin);

        return Ok(new { Token = token });
    }

    private string GenerateJwtToken(Admins admin)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, admin.AdminId.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, admin.Email),
            new Claim(ClaimTypes.Name, admin.Name)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private bool VerifyPassword(string password, string storedHash)
    {
        // Giả sử bạn sử dụng BCrypt để băm mật khẩu, nếu không thay đổi logic này tương ứng
        return BCrypt.Net.BCrypt.Verify(password, storedHash);
    }
}

public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
