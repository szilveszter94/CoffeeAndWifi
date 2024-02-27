namespace CafeAndWifi.Model;

public interface ICafe
{
    int Id { get; init; }
    string Name { get; init; }
    string MapUrl { get; init; }
    double Latitude { get; init; }
    double Longitude { get; init; }
    string ImgUrl { get; init; }
    string Country { get; init; }
    string City { get; init; }
    string Address { get; init; }
    string Description { get; init; }
    int Seats { get; init; }
    decimal CoffeePrice { get; init; }
    double Rating { get; init; }
    bool HasToilet { get; init; }
    bool HasWifi { get; init; }
    bool HasSockets { get; init; }
    bool CanTakeCalls { get; init; }
    bool CanPayWith_card { get; init; }
    List<Comment> Comments { get; set; }
}