using CafeAndWifi.Context;
using CafeAndWifi.Model;
using CafeAndWifi.Model.AuthenticationModels;
using CafeAndWifi.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace CafeAndWifiTest;

public class CafeRepositoryTest
{
    private DbContextOptions<CafeAndWifiContext> _contextOptions;
    private CafeAndWifiContext _context;
    private ICafeRepository _repository;
    
    [SetUp]
    public void Setup()
    {
        _contextOptions = new DbContextOptionsBuilder<CafeAndWifiContext>()
            .UseInMemoryDatabase("BloggingControllerTest")
            .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
            .Options;

        _context = new CafeAndWifiContext(_contextOptions);

        _context.Database.EnsureDeleted();
        _context.Database.EnsureCreated();

        _context.AddRange(_cafes);
        _context.AddRange(_comments);
        _context.AddRange(_users);
            
        _context.SaveChanges();
        
        _repository = new CafeRepository(_context);
    }
    
    [Test]
    public async Task GetCafeSuccess()
    {
        var result = await _repository.GetCafes();
        
        Assert.That(result.Count, Is.EqualTo(_cafes.Count));
        Assert.That(result, Is.EquivalentTo(_cafes));
    }
    
    [Test]
    public async Task GetCafeByIdSuccess()
    {
        var cafeId = 1;
        var result = await _repository.GetCafeById(cafeId);
        var expectedUser = new User { Id = "1", UserName = "user1", Email = "email@email1.com" };
        var comments = new List<CommentWithUser> {
            new CommentWithUser() { Comment = _comments[0], User = expectedUser },
            new CommentWithUser() { Comment = _comments[3], User = expectedUser },
            new CommentWithUser() { Comment = _comments[4], User = expectedUser }
        };

        Assert.That(result.Cafe, Is.EqualTo(_cafes[0]));
        Assert.That(result.Comments, Is.EquivalentTo(comments));
    }
    
    [Test]
    public async Task WrongIdFailToGetCafeById()
    {
        var cafeId = 77;
        var ex = Assert.ThrowsAsync<Exception>(() => _repository.GetCafeById(cafeId));
        Assert.That(ex, Is.InstanceOf<Exception>());
        Assert.That(ex.Message, Is.EqualTo("Cannot get cafe, an error occured."));
    }
    
    [Test]
    public async Task CreateCafeSuccess()
    {
        var cafeToCreate = new Cafe

        {
            Id = 7,
            Name = "sample7",
            Latitude = 7,
            Longitude = 8,
            ImgUrl = "www.example7.com",
            Country = "Belgium",
            City = "Brussel",
            Address = "sampleAddress7",
            Description = "Sample description7",
            Seats = 17,
            CoffeePrice = 27,
            Rating = 4.7,
            HasToilet = true,
            HasWifi = true,
            HasSockets = false,
            CanTakeCalls = true,
            CanPayWithCard = true,
            Comments = new List<Comment>()
        };
        var result = await _repository.AddCafe(cafeToCreate);
        
        Assert.That(result, Is.EqualTo(cafeToCreate));
    }
    
    [Test]
    public async Task CreateCommentSuccess()
    {
        var commentToCreate = new CommentRequest(4, "1", "Sample comment 1", new DateTime(2024, 03, 02));
        var result = await _repository.AddComment(commentToCreate);
        var convertedResult = new CommentRequest(result.CafeId, result.AuthorId, result.Text, result.Date);
        Assert.That(convertedResult, Is.EqualTo(commentToCreate));
    }
    
    [Test]
    public async Task SameIdFailToCreateCafe()
    {
        var cafeToCreate = new Cafe{
            Id = 1,
            Name = "sample1",
            Latitude = 7,
            Longitude = 8,
            ImgUrl = "www.example7.com",
            Country = "Belgium",
            City = "Brussel",
            Address = "sampleAddress7",
            Description = "Sample description7",
            Seats = 17,
            CoffeePrice = 27,
            Rating = 4.7,
            HasToilet = true,
            HasWifi = true,
            HasSockets = false,
            CanTakeCalls = true,
            CanPayWithCard = true,
            Comments = new List<Comment>()
        };
        var ex = Assert.ThrowsAsync<Exception>(() => _repository.AddCafe(cafeToCreate));
        Assert.That(ex, Is.InstanceOf<Exception>());
        Assert.That(ex.Message, Is.EqualTo("Cafe not created. An error occurred."));
    }
    
    [Test]
    public async Task UpdateCafeSuccess()
    {
        var cafeToUpdate = new Cafe{
            Id = 2,
            Name = "sample156",
            Latitude = 71,
            Longitude = 81,
            ImgUrl = "www.example71.com",
            Country = "Belgium",
            City = "Brussel",
            Address = "sampleAddress71",
            Description = "Sample description71",
            Seats = 17,
            CoffeePrice = 27,
            Rating = 4.7,
            HasToilet = true,
            HasWifi = true,
            HasSockets = false,
            CanTakeCalls = true,
            CanPayWithCard = true,
            Comments = new List<Comment>()
        };
        var result = await _repository.EditCafe(cafeToUpdate);
        
        Assert.That(result, Is.EqualTo(cafeToUpdate));
    }
    
    [Test]
    public async Task WrongIdFailToUpdateCafe()
    {
        var cafeToCreate = new Cafe{
            Id = 13,
            Name = "sample1",
            Latitude = 7,
            Longitude = 8,
            ImgUrl = "www.example21.com",
            Country = "Belgium",
            City = "Brussel",
            Address = "sampleAddress71",
            Description = "Sample description71",
            Seats = 17,
            CoffeePrice = 23,
            Rating = 4.1,
            HasToilet = true,
            HasWifi = true,
            HasSockets = false,
            CanTakeCalls = true,
            CanPayWithCard = true,
            Comments = new List<Comment>()
        };
        var ex = Assert.ThrowsAsync<KeyNotFoundException>(() => _repository.EditCafe(cafeToCreate));
        Assert.That(ex, Is.InstanceOf<KeyNotFoundException>());
        Assert.That(ex.Message, Is.EqualTo("Failed to update. Cafe not found."));
    }
    
    [Test]
    public async Task DeleteCafeSuccess()
    {
        var cafeId = 4;
        
        Exception exception = null;
        try
        {
            await _repository.DeleteCafe(cafeId);
        }
        catch (Exception ex)
        {
            exception = ex;
        }

        Assert.That(exception, Is.Null);
    }
    
    [Test]
    public async Task DeleteCafeThrowsExceptionWhenIdIsWrong()
    {
        var cafeId = 70;
        var ex = Assert.ThrowsAsync<KeyNotFoundException>(() => _repository.DeleteCafe(cafeId));
        Assert.That(ex, Is.InstanceOf<KeyNotFoundException>());
        Assert.That(ex.Message, Is.EqualTo($"Failed to delete. Cafe not found."));
    }
    
    private readonly List<Cafe> _cafes = new()
    {
        new Cafe
        {
            Id = 1,
            Name = "sample1",
            Latitude = 1,
            Longitude = 2,
            ImgUrl = "www.example1.com",
            Country = "Hungary",
            City = "Budapest",
            Address = "sampleAddress1",
            Description = "Sample description1",
            Seats = 10,
            CoffeePrice = 20,
            Rating = 4,
            HasToilet = true,
            HasWifi = true,
            HasSockets = true,
            CanTakeCalls = true,
            CanPayWithCard = true,
            Comments = new List<Comment>()
        },
        new Cafe
        {
            Id = 2,
            Name = "sample2",
            Latitude = 2,
            Longitude = 3,
            ImgUrl = "www.example2.com",
            Country = "France",
            City = "Paris",
            Address = "sampleAddress2",
            Description = "Sample description2",
            Seats = 11,
            CoffeePrice = 21,
            Rating = 4.1,
            HasToilet = true,
            HasWifi = false,
            HasSockets = true,
            CanTakeCalls = true,
            CanPayWithCard = true,
            Comments = new List<Comment>()
        },
        new Cafe
        {
            Id = 3,
            Name = "sample3",
            Latitude = 3,
            Longitude = 4,
            ImgUrl = "www.example3.com",
            Country = "Italy",
            City = "Rome",
            Address = "sampleAddress3",
            Description = "Sample description3",
            Seats = 12,
            CoffeePrice = 22,
            Rating = 4.2,
            HasToilet = true,
            HasWifi = true,
            HasSockets = false,
            CanTakeCalls = true,
            CanPayWithCard = true,
            Comments = new List<Comment>()
        },
        new Cafe
        {
            Id = 4,
            Name = "sample4",
            Latitude = 4,
            Longitude = 5,
            ImgUrl = "www.example4.com",
            Country = "Russia",
            City = "Moscow",
            Address = "sampleAddress4",
            Description = "Sample description4",
            Seats = 13,
            CoffeePrice = 23,
            Rating = 4.3,
            HasToilet = true,
            HasWifi = true,
            HasSockets = true,
            CanTakeCalls = false,
            CanPayWithCard = true,
            Comments = new List<Comment>()
        },
        new Cafe
        {
            Id = 5,
            Name = "sample5",
            Latitude = 5,
            Longitude = 6,
            ImgUrl = "www.example5.com",
            Country = "Turkey",
            City = "Istambul",
            Address = "sampleAddress5",
            Description = "Sample description5",
            Seats = 14,
            CoffeePrice = 24,
            Rating = 4.4,
            HasToilet = true,
            HasWifi = true,
            HasSockets = true,
            CanTakeCalls = true,
            CanPayWithCard = false,
            Comments = new List<Comment>()
        },
        new Cafe
        {
            Id = 6,
            Name = "sample6",
            Latitude = 6,
            Longitude = 7,
            ImgUrl = "www.example7.com",
            Country = "Spain",
            City = "Madrid",
            Address = "sampleAddress6",
            Description = "Sample description6",
            Seats = 15,
            CoffeePrice = 25,
            Rating = 4.5,
            HasToilet = true,
            HasWifi = false,
            HasSockets = false,
            CanTakeCalls = true,
            CanPayWithCard = true,
            Comments = new List<Comment>()
        }
    };

    private readonly List<Comment> _comments = new List<Comment>
    {
        new Comment()
        {
            Id = 1,
            CafeId = 1,
            AuthorId = "1",
            Date = new DateTime(2024, 03, 02),
            Text = "Sample comment 1"
        },
        new Comment()
        {
            Id = 2,
            CafeId = 2,
            AuthorId = "2",
            Date = new DateTime(2024, 03, 02),
            Text = "Sample comment 2"
        },
        new Comment()
        {
            Id = 3,
            CafeId = 3,
            AuthorId = "3",
            Date = new DateTime(2024, 03, 02),
            Text = "Sample comment 3"
        },
        new Comment()
        {
            Id = 4,
            CafeId = 1,
            AuthorId = "1",
            Date = new DateTime(2024, 03, 02),
            Text = "Sample comment 4"
        },
        new Comment()
        {
            Id = 5,
            CafeId = 1,
            AuthorId = "1",
            Date = new DateTime(2024, 03, 02),
            Text = "Sample comment 5"
        }
    };

    private readonly List<IdentityUser> _users = new List<IdentityUser>()
    {
        new IdentityUser { Id = "1", UserName = "user1", Email = "email@email1.com" },
        new IdentityUser { Id = "2", UserName = "user2", Email = "email@email2.com" },
        new IdentityUser { Id = "3", UserName = "user3", Email = "email@email3.com" },
        new IdentityUser { Id = "4", UserName = "user4", Email = "email@email4.com" },
        new IdentityUser { Id = "5", UserName = "user5", Email = "email@email5.com" },
        new IdentityUser { Id = "6", UserName = "user6", Email = "email@email6.com" },
    };
}