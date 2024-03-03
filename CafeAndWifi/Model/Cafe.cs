namespace CafeAndWifi.Model;

public class Cafe : ICafe
{
    public int Id { get; init; }
    public string Name { get; init; }
    public double Latitude { get; init; }
    public double Longitude { get; init; }
    public string ImgUrl { get; init; }
    public string Country { get; init; }
    public string City { get; init; }
    public string Address { get; init; }
    public string Description { get; init; }
    public int Seats { get; init; }
    public decimal CoffeePrice { get; init; }
    public double Rating { get; init; }
    public bool HasToilet { get; init; }
    public bool HasWifi { get; init; }
    public bool HasSockets { get; init; }
    public bool CanTakeCalls { get; init; }
    public bool CanPayWithCard { get; init; }
    public List<Comment> Comments  { get; init; }
}