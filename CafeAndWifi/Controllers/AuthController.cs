using Azure;
using CafeAndWifi.Model.AuthenticationModels;
using CafeAndWifi.Services.Authentication;
using CafeAndWifi.Services.EmailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CafeAndWifi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authenticationService;
    private readonly IEmailSender _emailSender;
    private readonly UserManager<IdentityUser> _userManager;

    public AuthController(IAuthService authenticationService, IEmailSender emailSender, UserManager<IdentityUser> userManager)
    {
        _authenticationService = authenticationService;
        _emailSender = emailSender;
        _userManager = userManager;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<RegistrationResponse>> Register(RegistrationRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result =
                await _authenticationService.RegisterAsync(request.Email, request.Username, request.Password, "User");

            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(ModelState);
            }

            await SendEmail(request);
            return CreatedAtAction(nameof(Register),
                new
                {
                    message = "Register was successful. Check your inbox and confirm your account.",
                    data = new RegistrationResponse(result.Email, result.UserName)
                });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = e.Message });
        }
    }
    
    [HttpGet("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail(string userId, string token)
    {
        if (userId == null || token == null)
        {
            return BadRequest("Invalid credentials.");
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return BadRequest("Invalid user id.");
        }
        
        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (result.Succeeded)
        {
            return Ok("Successfully confirmed.");
        }
        
        return BadRequest("Confirmation failed.");
    }
    
    [HttpPost("Login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await _authenticationService.LoginAsync(request.Email, request.Password);

        if (!result.Success)
        {
            AddErrors(result);
            return BadRequest(ModelState);
        }

        return Ok(new AuthResponse(result.Email, result.UserName, result.Token));
    }

    private void AddErrors(AuthResult result)
    {
        foreach (var error in result.ErrorMessages)
        {
            ModelState.AddModelError(error.Key, error.Value);
        }
    }

    private async Task SendEmail(RegistrationRequest request)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action(
                "ConfirmEmail",
                "Auth",
                new { userId = user.Id, token = token },
                Request.Scheme,
                Request.Host.ToString()
            );

            await _emailSender.SendEmailAsync(request.Email, "Confirm your email",
                $"Please confirm your email by clicking this link: <a href='{confirmationLink}'>link</a>");
        }
        catch (RequestFailedException e)
        {
            Console.WriteLine(e);
            throw new Exception(e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Register failed. An error occured.");
        }
    }
}