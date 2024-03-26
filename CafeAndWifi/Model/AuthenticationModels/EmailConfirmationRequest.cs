namespace CafeAndWifi.Model.AuthenticationModels;

public record EmailConfirmationRequest(string UserId, string Token);