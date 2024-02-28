using CafeAndWifi.Model;

namespace CafeAndWifi.Repository;

public interface ICafeRepository
{
    List<Cafe> GetCafes();
    Cafe? GetCafeById(int id);
    Cafe AddCafe(Cafe cafe);
    Cafe EditCafe(Cafe cafe);
    void DeleteCafe(int id);
}