using CafeAndWifi.Model;
using CafeAndWifi.Model.AuthenticationModels;
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
    public async Task<ActionResult<Cafe>> GetCafes()
    {
        try
        {
            var result = await _cafeRepository.GetCafes();
            return Ok(new {data = result, message = "Cafe retrieved successfully."});

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound(new { message = "An unexpected error occured. Cafe not found." });
        }
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Cafe>> GetCafeById(int id)
    {
        try
        {
            var result = await _cafeRepository.GetCafeById(id);
            if (result == null) return NotFound(new { message = "Cafe not found." });
            return Ok(new {data = result, message = "Cafe retrieved successfully."});

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return NotFound(new { message = "An unexpected error occured. Cafe not found." });
        }
    }

    [HttpPost]
    public async Task<ActionResult<Cafe>> AddCafe(Cafe cafe)
    {
        try
        {
            var result = await _cafeRepository.AddCafe(cafe);
            return Ok(new { message = "Cafe created successfully", data = result });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = "Cafe not created." });
        }
    }
    
    [HttpPost("Comment")]
    public async Task <ActionResult<Cafe>> AddComment(CommentRequest request)
    {
        try
        {
            var result = await _cafeRepository.AddComment(request);
            return Ok(new { message = "Comment submitted.", data = result });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = "Comment not submitted." });
        }
    }
    
    [HttpPatch]
    public async Task<ActionResult<Cafe>> EditCafe(Cafe cafe)
    {
        try
        {
            var result = await _cafeRepository.EditCafe(cafe);
            return Ok(new { message = "Cafe modified successfully", data = result });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = e.Message });
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult<Cafe>> DeleteCafe(int id)
    {
        try
        {
            await _cafeRepository.DeleteCafe(id);
            return Ok(new { message = "Cafe deleted successfully" });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = e.Message });
        }
    }
}