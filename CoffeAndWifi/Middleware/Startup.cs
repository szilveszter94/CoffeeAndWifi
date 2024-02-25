namespace CoffeAndWifi.Middleware;

public class Startup
{

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("Development", builder =>
            {
                // Allow multiple HTTP methods
                builder.WithMethods("GET", "POST", "PATCH", "DELETE", "OPTIONS")
                    .WithHeaders(
                        "Accept",
                        "Content-Type",
                        "Authorization")
                    .AllowCredentials()
                    .SetIsOriginAllowed(origin =>
                    {
                        if (string.IsNullOrWhiteSpace(origin)) return false;
                        if (origin.ToLower().StartsWith("http://localhost")) return true;
                        return false;
                    });
            });
        });
    }
}