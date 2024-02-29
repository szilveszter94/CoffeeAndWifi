using System.IdentityModel.Tokens.Jwt;
using Azure;
using CafeAndWifi.Model.AuthenticationModels;
using CafeAndWifi.Services.Authentication;
using CafeAndWifi.Services.EmailService;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

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
                return BadRequest(new { message = "Register failed. An error occured." } );
            }

            var result =
                await _authenticationService.RegisterAsync(request.Email, request.Username, request.Password, "User");

            if (!result.Success)
            {
                AddErrors(result);
                return BadRequest(new { message = ExtractErrorMessageFromModelState(ModelState)} );
            }

            await SendEmailConfirmation(request.Email);
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
            return BadRequest(new {message = "Invalid credentials."});
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return BadRequest(new {message = "Invalid user id."});
        }
        
        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (result.Succeeded)
        {
            return Ok(new {message = "Successfully confirmed."});
        }
        
        return BadRequest(new {message = "Confirmation failed."});
    }
    
    [HttpGet("ResetPassword")]
    public IActionResult ResetPassword(string userId, string token)
    {
        if (userId == null || token == null)
        {
            return BadRequest(new { message = "Invalid reset link." });
        }
        
        return Ok( new { message = "Reset your password.", data = new {UserId = userId, Token = token} });
    }
    
    [HttpPost("ForgotPassword")]
    public async Task<IActionResult> ForgotPassword(string email)
    {
        try
        {
            await SendPasswordResetEmail(email);
            return Ok( new { message = "Password reset email sent. Check your inbox." });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = e.Message });
        }
    }
    
    [HttpPost("ResetPassword")]
    public async Task<IActionResult> ResetPassword(string userId, string token, string newPassword)
    {
        // Verify userId and token
        if (userId == null || token == null)
        {
            return BadRequest(new { message = "Invalid reset link." });
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return BadRequest(new { message = "Invalid user." });
        }
        
        var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
        if (result.Succeeded)
        {
            return Ok(new { message = "Password reset successful." });
        }

        return BadRequest(new { message = "Password reset failed." });
    }
    
    [HttpPost("Login")]
    public async Task<ActionResult<AuthResponse>> Authenticate([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { message = "Login failed, invalid email or password." });
        }

        var result = await _authenticationService.LoginAsync(request.Email, request.Password);

        if (!result.Success)
        {
            AddErrors(result);
            return BadRequest(new { message = ExtractErrorMessageFromModelState(ModelState) });
        }

        return Ok(new { message = "Login successful", data = new AuthResponse(result.Email, result.UserName, result.Token) });
    }
    
    [HttpPost("Validate")]
    public async Task<IActionResult> ValidateToken([FromBody] TokenValidationRequest request)
    {
        Console.WriteLine($"Okkadsadasd {request}");
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.ReadToken(request.Token) as JwtSecurityToken;
            
            if (token.ValidTo < DateTime.UtcNow)
            {
                return BadRequest(new { message = "Token expired" });
            }
            
            return Ok(new { message = "Token is valid" });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return BadRequest(new { message = "Token validation failed" });
        }
    }

    private void AddErrors(AuthResult result)
    {
        foreach (var error in result.ErrorMessages)
        {
            ModelState.AddModelError(error.Key, error.Value);
        }
    }

    private async Task SendEmailConfirmation(string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action(
                "ConfirmEmail",
                "Auth",
                new { userId = user.Id, token },
                Request.Scheme,
                Request.Host.ToString()
            );

            await _emailSender.SendEmailAsync(email, "Confirm your email",
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
    
    private async Task SendPasswordResetEmail(string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                throw new Exception();
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var resetLink = Url.Action("ResetPassword", "Auth", new { userId = user.Id, token }, Request.Scheme);


            await _emailSender.SendEmailAsync(email, "Reset your password.",
                $"Please reset your password by clicking this link: <a href='{resetLink}'>link</a>");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Password reset email sent. Check your inbox.");
        }
    }

    private string ExtractErrorMessageFromModelState(ModelStateDictionary modelState)
    {
        List<string> errorMessages = new List<string>();
        
        foreach (var keyValuePair in modelState)
        {
            if (keyValuePair.Value.Errors.Any())
            {
                foreach (var error in keyValuePair.Value.Errors)
                {
                    errorMessages.Add(error.ErrorMessage);
                }
            }
        }
        
        return string.Join("; ", errorMessages);
    }
}