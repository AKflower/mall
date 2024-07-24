using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class floors2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Stalls",
                newName: "FloorId");

            migrationBuilder.AddColumn<string>(
                name: "Parking",
                table: "Stalls",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Parking",
                table: "Stalls");

            migrationBuilder.RenameColumn(
                name: "FloorId",
                table: "Stalls",
                newName: "Location");
        }
    }
}
