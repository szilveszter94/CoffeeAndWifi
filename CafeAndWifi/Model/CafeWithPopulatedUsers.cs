namespace CafeAndWifi.Model;

public record CafeWithPopulatedUsers(ICafe Cafe, List<object> Comments);