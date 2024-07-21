using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Admins> Admins { get; set; }
    public DbSet<CinemaHalls> CinemaHalls { get; set; }
    public DbSet<FeedBacks> FeedBacks { get; set; }
    public DbSet<Galleries> Galleries { get; set; }
    public DbSet<Movies> Movies { get; set; }
    public DbSet<Products> Products { get; set; }
    public DbSet<ProductTypes> ProductTypes { get; set; }
    public DbSet<ShowTimes> ShowTimes { get; set; }
    public DbSet<Stalls> Stalls { get; set; }
    public DbSet<StallTypes> StallTypes { get; set; }
    public DbSet<Tickets> Tickets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admins>()
            .HasKey(a => a.AdminId);

        modelBuilder.Entity<CinemaHalls>()
            .HasKey(a => a.CinemaHallId);

        modelBuilder.Entity<FeedBacks>()
            .HasKey(a => a.FeedBackId);
        
        modelBuilder.Entity<Galleries>()
            .HasKey(a => a.ImageId);

        modelBuilder.Entity<Movies>()
            .HasKey(a => a.MovieId);

        modelBuilder.Entity<Products>()
            .HasKey(a => a.ProductId);

        modelBuilder.Entity<ProductTypes>()
            .HasKey(a => a.ProductTypeId);

        modelBuilder.Entity<ShowTimes>()
            .HasKey(a => a.ShowTimeId);

        modelBuilder.Entity<Stalls>()
            .HasKey(a => a.StallId);

        modelBuilder.Entity<StallTypes>()
            .HasKey(a => a.StallTypeId);

        modelBuilder.Entity<Tickets>()
            .HasKey(a => a.TicketId);
    //     modelBuilder.Entity<FoodItem>()
    //         .HasOne(f => f.Stall)
    //         .WithMany()
    //         .HasForeignKey(f => f.StallId);

    //     modelBuilder.Entity<Feedback>()
    //         .HasOne(f => f.User)
    //         .WithMany()
    //         .HasForeignKey(f => f.UserId);

    //     modelBuilder.Entity<TheaterSeat>()
    //         .HasOne(ts => ts.Movie)
    //         .WithMany()
    //         .HasForeignKey(ts => ts.MovieId);

    //     modelBuilder.Entity<Booking>()
    //         .HasOne(b => b.User)
    //         .WithMany()
    //         .HasForeignKey(b => b.UserId);

    //     modelBuilder.Entity<Booking>()
    //         .HasOne(b => b.Movie)
    //         .WithMany()
    //         .HasForeignKey(b => b.MovieId);

    //     modelBuilder.Entity<Booking>()
    //         .HasOne(b => b.Seat)
    //         .WithMany()
    //         .HasForeignKey(b => b.SeatId);
    }
}
