using Microsoft.EntityFrameworkCore.Migrations;

namespace TimeSheetWebApi.Migrations
{
    public partial class designation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Designation",
                table: "users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Designation",
                table: "users");
        }
    }
}
