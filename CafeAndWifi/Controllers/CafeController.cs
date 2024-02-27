using CafeAndWifi.Model;
using CafeAndWifi.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CafeAndWifi.Controllers;

[ApiController]
[Route("[controller]")]
public class CafeController : ControllerBase
{
    private readonly ICafeRepository _cafeRepository;

    public CafeController(ICafeRepository cafeRepository)
    {
        _cafeRepository = cafeRepository;
    }
    
    [HttpGet]
    public ActionResult<Cafe> GetCoffeeByLocation(double lat, double lon)
    {
        try
        {
            var result = _cafeRepository.GetCafes();
            return Ok(new {data = result, message = "Coffee retrieved successfully."});

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound(new { message = "An unexpected error occured. Coffee not found." });
        }
    }
}