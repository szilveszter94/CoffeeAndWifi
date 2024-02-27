using CafeAndWifi.Model;

namespace CafeAndWifi.Repository;

public interface ICafeRepository
{
    List<Cafe> GetCafes();
}