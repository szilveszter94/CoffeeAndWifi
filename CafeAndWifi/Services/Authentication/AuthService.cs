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

    private static AuthResult FailedRegistration(IdentityResult result, string email, string username)
    {
        var authResult = new AuthResult(false, email, username, "");

        foreach (var error in result.Errors)
        {
            authResult.ErrorMessages.Add(error.Code, error.Description);
        }

        return authResult;
    }
    
    public async Task<AuthResult> LoginAsync(string email, string password)
    {
        var managedUser = await _userManager.FindByEmailAsync(email);

        if (managedUser == null)
        {
            return InvalidEmail(email);
        }

        var isPasswordValid = await _userManager.CheckPasswordAsync(managedUser, password);
        if (!isPasswordValid)
        {
            return InvalidPassword(email, managedUser.UserName);
        }

        var roles = await _userManager.GetRolesAsync(managedUser);
        var accessToken = _tokenService.CreateToken(managedUser, roles[0]);

        return new AuthResult(true, managedUser.Email, managedUser.UserName, accessToken);
    }

    private static AuthResult InvalidEmail(string email)
    {
        var result = new AuthResult(false, email, "", "");
        result.ErrorMessages.Add("Bad credentials", "Invalid email");
        return result;
    }

    private static AuthResult InvalidPassword(string email, string userName)
    {
        var result = new AuthResult(false, email, userName, "");
        result.ErrorMessages.Add("Bad credentials", "Invalid password");
        return result;
    }
    
    private string SanitizeUsername(string username)
    {
        return username.Replace(" ", "_");
    }
}