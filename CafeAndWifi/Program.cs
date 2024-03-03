using System.Text;
using CafeAndWifi.Context;
using CafeAndWifi.Repository;
using CafeAndWifi.Services.Authentication;
using CafeAndWifi.Services.EmailService;
using CafeAndWifi.Services.Token;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

AddServices();
ConfigureSwagger();
AddDbContext();
AddAuthentication();
AddIdentity();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var connection ="http://localhost:5173/";

app.UseCors(b => {
    b.WithOrigins(connection!)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithExposedHeaders("content-type") // Allow the 'content-type' header to be exposed
        .SetIsOriginAllowed(_ => true); // Allow any origin for CORS
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

AddRoles();
AddAdmin();

app.Run();

void AddServices()
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddTransient<IEmailSender, EmailSender>();
        services.AddDbContext<CafeContext>();
        services.AddScoped<ICafeRepository, CafeRepository>();
    }
    
void ConfigureSwagger()
{
    services.AddSwaggerGen(option =>
    {
        option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter a valid token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "Bearer"
        });
        option.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type=ReferenceType.SecurityScheme,
                        Id="Bearer"
                    }
                },
                new string[]{}
            }
        });
    });
}

void AddDbContext()
{
    services.AddDbContext<UserContext.UsersContext>();
}

void AddAuthentication()
{
    Env.Load();
    var signInKey = Environment.GetEnvironmentVariable("ISSUER_SIGN_IN_KEY");
    services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ClockSkew = TimeSpan.Zero,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "apiWithAuthBackend",
                ValidAudience = "apiWithAuthBackend",
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(signInKey)
                ),
            };
        });
}

void AddIdentity()
{
    services
        .AddIdentityCore<IdentityUser>(options =>
        {
            options.SignIn.RequireConfirmedAccount = true;
            options.User.RequireUniqueEmail = true;
            options.Password.RequireDigit = false;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
        })
        .AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<UserContext.UsersContext>()
        .AddDefaultTokenProviders();
}

void AddRoles()
{
    using var scope = app.Services.CreateScope();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    var tAdmin = CreateAdminRole(roleManager);
    tAdmin.Wait();

    var tUser = CreateUserRole(roleManager);
    tUser.Wait();
}

async Task CreateAdminRole(RoleManager<IdentityRole> roleManager)
{
    Env.Load();
    var adminRole = Environment.GetEnvironmentVariable("ADMIN_ROLE");
    await roleManager.CreateAsync(new IdentityRole(adminRole));
}

async Task CreateUserRole(RoleManager<IdentityRole> roleManager)
{
    Env.Load();
    var userRole = Environment.GetEnvironmentVariable("USER_ROLE");
    await roleManager.CreateAsync(new IdentityRole(userRole));
}

void AddAdmin()
{
    var tAdmin = CreateAdminIfNotExists();
    tAdmin.Wait();
}

async Task CreateAdminIfNotExists()
{
    Env.Load();
    var adminEmail = Environment.GetEnvironmentVariable("ADMIN_EMAIL");
    var adminUsername = Environment.GetEnvironmentVariable("ADMIN_USERNAME");
    var adminPassword = Environment.GetEnvironmentVariable("ADMIN_PASSWORD");
    var adminRole = Environment.GetEnvironmentVariable("ADMIN_ROLE");
    using var scope = app.Services.CreateScope();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
    var adminInDb = await userManager.FindByEmailAsync(adminEmail);
    if (adminInDb == null)
    {
        var admin = new IdentityUser { UserName = adminUsername, Email = adminEmail, EmailConfirmed = true };
        var adminCreated = await userManager.CreateAsync(admin, adminPassword);

        if (adminCreated.Succeeded)
        {
            await userManager.AddToRoleAsync(admin, adminRole);
        }
    }
}