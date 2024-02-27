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
    public ActionResult<Cafe> GetCafes()
    {
        try
        {
            var result = _cafeRepository.GetCafes();
            return Ok(new {data = result, message = "Cafe retrieved successfully."});

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound(new { message = "An unexpected error occured. Cafe not found." });
        }
    }
    
    [HttpGet("{id}")]
    public ActionResult<Cafe> GetCafeById(int id)
    {
        try
        {
            var result = _cafeRepository.GetCafeById(id);
            if (result == null) return NotFound(new { message = "Cafe not found." });
            return Ok(new {data = result, message = "Cafe retrieved successfully."});

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound(new { message = "An unexpected error occured. Cafe not found." });
        }
    }
}