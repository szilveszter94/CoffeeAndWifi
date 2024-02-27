using CafeAndWifi.Model;

namespace CafeAndWifi.Repository;

public interface ICafeRepository
{
    List<Cafe> GetCafes();
    Cafe? GetCafeById(int id);
    Cafe AddCafe(Cafe cafe);
}