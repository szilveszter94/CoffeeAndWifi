namespace CafeAndWifi.Model;

public interface ICafe
{
    int Id { get; set; }
    string Name { get; set; }
    double Latitude { get; set; }
    double Longitude { get; set; }
    string ImgUrl { get; set; }
    string Country { get; set; }
    string City { get; set; }
    string Address { get; set; }
    string Description { get; set; }
    int Seats { get; set; }
    decimal CoffeePrice { get; set; }
    double Rating { get; set; }
    bool HasToilet { get; set; }
    bool HasWifi { get; set; }
    bool HasSockets { get; set; }
    bool CanTakeCalls { get; set; }
    bool CanPayWithCard { get; set; }
    ICollection<Comment> Comments { get; set; }
}