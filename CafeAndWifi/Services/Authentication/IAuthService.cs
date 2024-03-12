using CafeAndWifi.Model.AuthenticationModels;
using Microsoft.AspNetCore.Identity;

namespace CafeAndWifi.Services.Authentication;

public interface IAuthService
{
    Task<AuthResult> RegisterAsync(string email, string username, string password, string role);
    Task<TokenConfirmResponse> GenerateEmailConfirmationToken(string email);
    Task<IdentityResult> ConfirmEmail(EmailConfirmationRequest request);
    Task<IdentityResult> ResetPassword(ResetPasswordRequest request);
    Task<TokenConfirmResponse> GeneratePasswordConfiramtionToken(string email);
    Task<AuthResult> GoogleLoginAsync(string email, string username, string role);
    Task<AuthResult> LoginAsync(string email, string password);
}