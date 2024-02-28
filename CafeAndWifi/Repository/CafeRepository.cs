using CafeAndWifi.Model;

namespace CafeAndWifi.Repository;

public class CafeRepository : ICafeRepository
{
    private List<Cafe> _cafes;

    public CafeRepository()
    {
        _cafes = new List<Cafe>
        {
            new()
            {
                Id = 1,
                Name = "Coffee House",
                Latitude = 40.7128,
                Longitude = -74.0060,
                ImgUrl = "https://garzoncafe.hu/wp-content/uploads/2022/03/GARZON_inside.png",
                Country = "United States",
                City = "New York",
                Address = "123 Main Street",
                Description = "A cozy coffee house offering a variety of espresso drinks and pastries.",
                Seats = 20,
                CoffeePrice = 3.50m,
                Rating = 3.5,
                HasToilet = true,
                HasWifi = true,
                HasSockets = true,
                CanTakeCalls = true,
                CanPayWithCard = true,
                Comments = new List<Comment>
                {
                    new()
                    {
                        Id = 1, CafeId = 1, AuthorId = 1, Date = DateTime.Now, Text = "Great coffee and atmosphere!"
                    },
                    new() { Id = 2, CafeId = 1, AuthorId = 1, Date = DateTime.Now, Text = "Love the pastries here." }
                }
            },
            new()
            {
                Id = 2,
                Name = "Latte Lounge",
                Latitude = 34.0522,
                Longitude = -118.2437,
                ImgUrl = "https://media-cdn.tripadvisor.com/media/photo-s/10/e5/73/92/photo1jpg.jpg",
                Country = "United States",
                City = "Los Angeles",
                Address = "456 Oak Avenue",
                Description = "A trendy lounge specializing in artisanal lattes and light bites.",
                Seats = 30,
                CoffeePrice = 4.00m,
                Rating = 4.5,
                HasToilet = false,
                HasWifi = false,
                HasSockets = false,
                CanTakeCalls = false,
                CanPayWithCard = false,
                Comments = new List<Comment>
                {
                    new() { Id = 3, CafeId = 2, AuthorId = 1, Date = DateTime.Now, Text = "Amazing latte art!" },
                    new()
                    {
                        Id = 4, CafeId = 2, AuthorId = 1, Date = DateTime.Now, Text = "Great place to work remotely."
                    }
                }
            }
        };
    }
    
    public List<Cafe> GetCafes()
    {
        try
        {
            return _cafes;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Cannot get cafes, an error occured.");
        }
    }

    public Cafe? GetCafeById(int id)
    {
        try
        {
            return _cafes.FirstOrDefault(cafe => cafe.Id == id);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Cannot get cafe, an error occured.");
        }
        
    }

    public Cafe AddCafe(Cafe cafe)
    {
        try
        {
            _cafes.Add(cafe);
            return cafe;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Cafe not created. An error occured.");
        }
    }
    
    public Cafe EditCafe(Cafe cafe)
    {
        try
        {
            int accountId = _cafes.FindIndex(acc => acc.Id == cafe.Id);
            if (accountId < 0)
            {
                throw new KeyNotFoundException("Failed to update. Cafe not found.");
            }

            _cafes[accountId] = cafe;
            return cafe;
        }
        catch (KeyNotFoundException e)
        {
            Console.WriteLine(e);
            throw;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("An unexpected error occured. Cafe not updated.");
        }
    }
    
    public void DeleteCafe(int id)
    {
        try
        {
            Cafe? cafe = _cafes.Find(acc => acc.Id == id);
            if (cafe == null)
            {
                throw new KeyNotFoundException("Failed to delete. Cafe not found.");
            }
            _cafes.Remove(cafe);
        }
        catch (KeyNotFoundException e)
        {
            Console.WriteLine(e);
            throw;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("An unexpected error occured during delete.");
        }
    }
}