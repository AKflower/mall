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
    public DbSet<Floors> Floors { get; set; }

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

        modelBuilder.Entity<Galleries>()
            .Property(g => g.UploadedAt)
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

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

        modelBuilder.Entity<Floors>()
            .HasKey(a => a.FloorId);

        modelBuilder.Entity<ShowTimes>()
                .HasOne(st => st.Movie)
                .WithMany(m => m.ShowTimes)
                .HasForeignKey(st => st.MovieId);

        modelBuilder.Entity<ShowTimes>()
            .HasOne(st => st.CinemaHall)
            .WithMany(ch => ch.ShowTimes)
            .HasForeignKey(st => st.CinemaHallId);

        modelBuilder.Entity<CinemaHalls>()
            .HasOne(st => st.Stall)
            .WithMany(ch => ch.CinemaHalls)
            .HasForeignKey(st => st.StallId);

        modelBuilder.Entity<Movies>()
            .HasOne(st => st.Stall)
            .WithMany(ch => ch.Movies)
            .HasForeignKey(st => st.StallId);

        modelBuilder.Entity<Movies>()
            .HasOne(st => st.Gallery)
            .WithMany(ch => ch.Movies)
            .HasForeignKey(st => st.ImageId);

        modelBuilder.Entity<Products>()
            .HasOne(st => st.Stall)
            .WithMany(ch => ch.Products)
            .HasForeignKey(st => st.StallId);

        modelBuilder.Entity<Products>()
            .HasOne(st => st.Gallery)
            .WithMany(ch => ch.Products)
            .HasForeignKey(st => st.ImageId); 

        modelBuilder.Entity<Products>()
            .HasOne(st => st.ProductType)
            .WithMany(ch => ch.Products)
            .HasForeignKey(st => st.ProductTypeId); 

        modelBuilder.Entity<Stalls>()
            .HasOne(st => st.Floor)
            .WithMany(ch => ch.Stalls)
            .HasForeignKey(st => st.FloorId);

        modelBuilder.Entity<Stalls>()
            .HasOne(st => st.Gallery)
            .WithMany(ch => ch.Stalls)
            .HasForeignKey(st => st.ImageId); 

        modelBuilder.Entity<Stalls>()
            .HasOne(st => st.StallType)
            .WithMany(ch => ch.Stalls)
            .HasForeignKey(st => st.StallTypeId); 

        modelBuilder.Entity<Tickets>()
            .HasOne(st => st.ShowTime)
            .WithMany(ch => ch.Tickets)
            .HasForeignKey(st => st.ShowTimeId); 

        base.OnModelCreating(modelBuilder);
    }
}
