using CafeAndWifi.Model.AuthenticationModels;

namespace CafeAndWifi.Services.Authentication;

public interface IAuthService
{
    Task<AuthResult> RegisterAsync(string email, string username, string password, string role);
    Task<AuthResult> GoogleLoginAsync(string email, string username, string role);
    Task<AuthResult> LoginAsync(string email, string password);
}