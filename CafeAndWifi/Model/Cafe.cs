namespace CafeAndWifi.Model;

public class Cafe : ICafe
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string ImgUrl { get; set; }
    public string Country { get; set; }
    public string City { get; set; }
    public string Address { get; set; }
    public string Description { get; set; }
    public int Seats { get; set; }
    public decimal CoffeePrice { get; set; }
    public double Rating { get; set; }
    public bool HasToilet { get; set; }
    public bool HasWifi { get; set; }
    public bool HasSockets { get; set; }
    public bool CanTakeCalls { get; set; }
    public bool CanPayWithCard { get; set; }
    public ICollection<Comment> Comments  { get; set; }
}