using CafeAndWifi.Model;
using CafeAndWifi.Model.AuthenticationModels;
using CafeAndWifi.Services.Token;
using Microsoft.AspNetCore.Identity;

namespace CafeAndWifi.Services.Authentication;

public class AuthService : IAuthService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthService(UserManager<IdentityUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<AuthResult> GoogleLoginAsync(string email, string username, string role)
    {
        try
        {
            username = SanitizeUsername(username);
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // User doesn't exist, create a new user
                var newUser = new IdentityUser { UserName = username, Email = email, EmailConfirmed = true};
                var result = await _userManager.CreateAsync(newUser);
                if (!result.Succeeded)
                {
                    return FailedRegistration(result, email, username);
                }
            
                await _userManager.AddToRoleAsync(newUser, role);
            
                var roles = await _userManager.GetRolesAsync(newUser);
                var accessToken = _tokenService.CreateToken(newUser, roles[0]);
                return new AuthResult(true, email, username, accessToken);
            }
            else
            {
                var roles = await _userManager.GetRolesAsync(user);
                var accessToken = _tokenService.CreateToken(user, roles[0]);
                return new AuthResult(true, email, username, accessToken);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Google login failed.");
        }
    }

    public async Task<TokenConfirmResponse> GenerateEmailConfirmationToken(string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            return new TokenConfirmResponse(user.Id, token);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Failed to generate email confirmation key.");
        }
    }

    public async Task<IdentityResult> ConfirmEmail(EmailConfirmationRequest request)
    {
        var user = await _userManager.FindByIdAsync(request.UserId);
        if (user == null)
        {
            throw new Exception("Invalid user id.");
        }
        
        return await _userManager.ConfirmEmailAsync(user, request.Token);
    }

    public async Task<IdentityResult> ResetPassword(ResetPasswordRequest request)
    {
        var user = await _userManager.FindByIdAsync(request.UserId);
        if (user == null)
        {
            throw new Exception("Invalid user id.");
        }
        
        return await _userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);
    }

    public async Task<TokenConfirmResponse> GeneratePasswordConfiramtionToken(string email)
    {
        try
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                throw new Exception();
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            return new TokenConfirmResponse(user.Id, token);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Failed to generate key for password reset.");
        }
        
    }

    public async Task<AuthResult> RegisterAsync(string email, string username, string password, string role)
    {
        var user = new IdentityUser { UserName = username, Email = email };
        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            return FailedRegistration(result, email, username);
        }

        await _userManager.AddToRoleAsync(user, role);
        return new AuthResult(true, email, username, "");
    }
    
    public async Task<AuthResult> LoginAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
        {
            return InvalidEmail(email);
        }
        
        if (!user.EmailConfirmed)
        {
            return NotConfirmed(email, user.UserName);
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, password);
        if (!isPasswordValid)
        {
            return InvalidPassword(email, user.UserName);
        }

        var roles = await _userManager.GetRolesAsync(user);
        var accessToken = _tokenService.CreateToken(user, roles[0]);

        return new AuthResult(true, user.Email, user.UserName, accessToken);
    }

    private static AuthResult InvalidEmail(string email)
    {
        var result = new AuthResult(false, email, "", "");
        result.ErrorMessages.Add("Bad credentials", "Invalid email");
        return result;
    }
    
    private static AuthResult FailedRegistration(IdentityResult result, string email, string username)
    {
        var authResult = new AuthResult(false, email, username, "");

        foreach (var error in result.Errors)
        {
            authResult.ErrorMessages.Add(error.Code, error.Description);
        }

        return authResult;
    }

    private static AuthResult InvalidPassword(string email, string userName)
    {
        var result = new AuthResult(false, email, userName, "");
        result.ErrorMessages.Add("Bad credentials", "Invalid password");
        return result;
    }

    private static AuthResult NotConfirmed(string email, string userName)
    {
        var result = new AuthResult(false, email, userName, "", 403);
        result.ErrorMessages.Add("Bad request", "Email not confirmed");
        return result;
    }
    
    private string SanitizeUsername(string username)
    {
        return username.Replace(" ", "_");
    }
}