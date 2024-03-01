namespace CafeAndWifi.Model.AuthenticationModels;

public record ResetPasswordRequest(string? UserId, string? Token, string NewPassword);