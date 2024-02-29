using Azure;
using DotNetEnv;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace CafeAndWifi.Services.EmailService;

public class EmailSender : IEmailSender
{
    private readonly ILogger _logger;

    public EmailSender(ILogger<EmailSender> logger)
    {
        _logger = logger;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        Env.Load();
        var sendGridKey = Environment.GetEnvironmentVariable("SEND_GRID_KEY");
        await Execute(sendGridKey, subject, message, toEmail);
    }

    public async Task Execute(string apiKey, string subject, string message, string toEmail)
    {
        Env.Load();
        var senderEmail = Environment.GetEnvironmentVariable("SENDER_EMAIL_ADDRESS");
        var client = new SendGridClient(apiKey);
        var msg = new SendGridMessage()
        {
            From = new EmailAddress(senderEmail, "Password Recovery"),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(toEmail));
        
        msg.SetClickTracking(false, false);
        var response = await client.SendEmailAsync(msg);
        if (!response.IsSuccessStatusCode)
        {
            throw new RequestFailedException($"Failure Email to {toEmail}");
        }
    }
}