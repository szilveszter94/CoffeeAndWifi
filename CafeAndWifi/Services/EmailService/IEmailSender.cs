namespace CafeAndWifi.Services.EmailService;

public interface IEmailSender
{
    Task SendEmailAsync(string toEmail, string subject, string message);
    Task Execute(string apiKey, string subject, string message, string toEmail);
}