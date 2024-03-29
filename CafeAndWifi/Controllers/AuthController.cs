using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Azure;
using CafeAndWifi.Model.AuthenticationModels;
using CafeAndWifi.Services.Authentication;
using CafeAndWifi.Services.EmailService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace CafeAndWifi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authenticationService;
    private readonly IEmailSender _emailSender;
    private readonly IConfiguration _configuration;

    public AuthController(IAuthService authenticationService, IEmailSender emailSender, IConfiguration configuration)
    {
        _authenticationService = authenticationService;
        _emailSender = emailSender;
        _configuration = configuration;
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

    [HttpPost("AuthWithGoogle")]
    public async Task<ActionResult<object>> AuthWithGoogle(TokenValidationRequest tokenRequest)
    {
        try
        {
            var payload = await VerifyTokenWithGoogle(tokenRequest.Token);
            var authResult = await _authenticationService.GoogleLoginAsync(payload.Email, payload.Name, "User");
            return Ok(new { message = "Login successful.", data = new AuthResponse(authResult.Email, authResult.UserName, authResult.Token) });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = "Google login failed." });
        }
    }
    
    [HttpPost("ActivateEmail")]
    public async Task<ActionResult<RegistrationResponse>> ActivateEmail(ForgotEmailRequest emailRequest)
    {
        try
        {
            await SendEmailConfirmation(emailRequest.Email);
            return CreatedAtAction(nameof(Register),
                new
                {
                    message = "Confirmation email sent. Check your inbox and confirm your account.",
                });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = e.Message });
        }
    }
    
    [HttpPost("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail([FromBody] EmailConfirmationRequest request)
    {
        try
        {
            if (request.UserId == null || request.Token == null)
            {
                return BadRequest(new {message = "Invalid credentials."});
            }

            var result = await _authenticationService.ConfirmEmail(request);
            if (result.Succeeded)
            {
                return Ok(new {message = "Successfully confirmed."});
            }
        
            return BadRequest(new {message = "Confirmation failed."});
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = "Confirmation failed." });
        }
        
    }
    
    [HttpGet("ResetPassword")]
    public async Task<IActionResult> ResetPassword(string userId, string token)
    {
        if (userId == null || token == null)
        {
            return BadRequest(new { message = "Invalid reset link." });
        }
        
        return Ok( new { message = "Reset your password.", data = new {UserId = userId, Token = token} });
    }
    
    [HttpPost("ForgotPassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest forgotPasswordRequest)
    {
        try
        {
            await SendPasswordResetEmail(forgotPasswordRequest.Email);
            return Ok( new { message = "Password reset email sent. Check your inbox." });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest(new { message = e.Message });
        }
    }
    
    [HttpPost("ResetPassword")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        // Verify userId and token
        if (request.UserId == null || request.Token == null)
        {
            return BadRequest(new { message = "Invalid reset link." });
        }
        
        var result = await _authenticationService.ResetPassword(request);
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
            if (result.StatusCode == 403)
            {
                return StatusCode(403, new { message = "Activate your account." });
            }
            AddErrors(result);
            return BadRequest(new { message = ExtractErrorMessageFromModelState(ModelState) });
        }

        return Ok(new { message = "Login successful", data = new AuthResponse(result.Email, result.UserName, result.Token) });
    }

    [HttpPost("Validate")]
    public async Task<IActionResult> ValidateToken([FromBody] TokenValidationRequest request)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.ReadToken(request.Token) as JwtSecurityToken;
            if (token.ValidTo < DateTime.UtcNow)
            {
                return BadRequest(new { message = "Token expired" });
            }
            
            var username = token.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
            var email = token.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
            var role = token.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
            var userId = token.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value;
            
            return Ok(new { message = "Token is valid", data = new {username, email, userId, role } });
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
            var response = await _authenticationService.GenerateEmailConfirmationToken(email);
            
            var frontendBaseUrl = _configuration["FrontendBaseUrl"];
            var encodedToken = WebUtility.UrlEncode(response.Token);
            
            var confirmationLink = $"{frontendBaseUrl}/confirmEmail?userId={response.UserId}&token={encodedToken}";
            
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
            var response = await _authenticationService.GeneratePasswordConfiramtionToken(email);
            
            var frontendBaseUrl = _configuration["FrontendBaseUrl"];
            var encodedToken = WebUtility.UrlEncode(response.Token);
            var resetLink = $"{frontendBaseUrl}/resetPassword?userId={response.UserId}&token={encodedToken}";

            await _emailSender.SendEmailAsync(email, "Reset your password.",
                $"Please reset your password by clicking this link: <a href='{resetLink}'>link</a>");


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
    
    private async Task<GooglePayload> VerifyTokenWithGoogle(string token)
    {
        var client = new HttpClient();
        var response = await client.GetAsync($"https://www.googleapis.com/oauth2/v1/userinfo?access_token={token}");
        if (response.IsSuccessStatusCode)
        {
            var json = await response.Content.ReadAsStringAsync();
            var payload = JsonConvert.DeserializeObject<GooglePayload>(json);
            return payload;
        }
        throw new Exception("Failed to verify token with Google.");
        
    }
}