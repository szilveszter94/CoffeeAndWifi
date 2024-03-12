namespace CafeAndWifi.Model.AuthenticationModels;

public record AuthResult(
    bool Success,
    string Email,
    string UserName,
    string Token,
    int? StatusCode = null)
{
    //Error code - error message
    public readonly Dictionary<string, string> ErrorMessages = new();
}