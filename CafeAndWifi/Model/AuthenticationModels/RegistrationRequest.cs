using System.ComponentModel.DataAnnotations;

namespace CafeAndWifi.Model.AuthenticationModels;

public record RegistrationRequest(
    [Required]string Email, 
    [Required]string Username, 
    [Required]string Password);