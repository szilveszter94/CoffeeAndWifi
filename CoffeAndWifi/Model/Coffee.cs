namespace CoffeAndWifi.Model;

public class Coffee : ICoffee
{
    public int Id { get; init; }
    public string Name { get; init; }
    public double Lat { get; init; }
    public double Lon { get; init; }
}