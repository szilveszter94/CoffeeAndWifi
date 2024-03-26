using Microsoft.AspNetCore.Identity;

namespace CafeAndWifi.Services.Token;

public interface ITokenService
{
    public string CreateToken(IdentityUser user, string role);
}