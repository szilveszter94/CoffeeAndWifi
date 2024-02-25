using CoffeAndWifi.Model;
using Microsoft.AspNetCore.Mvc;

namespace CoffeAndWifi.Controllers;

[ApiController]
[Route("[controller]")]
public class CoffeeController : ControllerBase
{
    [HttpGet]
    public ActionResult<Coffee> GetCoffeeByLocation(double lat, double lon)
    {
        try
        {
            return Ok(new {data = new Coffee { Id = 1, Name = "Sample coffee", Lat = 5, Lon = 6 }, message = "Coffee retrieved successfully."});

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound(new { message = "An unexpected error occured. Coffee not found." });
        }
    }
}