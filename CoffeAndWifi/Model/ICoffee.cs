namespace CoffeAndWifi.Model;

public interface ICoffee
{
    int Id { get; init; }
    string Name { get; init; }
    double Lat { get; init; }
    double Lon { get; init; }
}