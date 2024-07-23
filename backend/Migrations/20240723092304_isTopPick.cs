using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class isTopPick : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Stalls");

            migrationBuilder.AddColumn<bool>(
                name: "isTopPick",
                table: "Stalls",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isTopPick",
                table: "Stalls");

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "Stalls",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
