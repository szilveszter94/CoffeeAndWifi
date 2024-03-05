using CafeAndWifi.Model;
using CafeAndWifi.Model.AuthenticationModels;

namespace CafeAndWifi.Repository;

public interface ICafeRepository
{
    List<Cafe> GetCafes();
    Cafe? GetCafeById(int id);
    Cafe AddCafe(Cafe cafe);
    Comment AddComment(CommentRequest request);
    Cafe EditCafe(Cafe cafe);
    void DeleteCafe(int id);
}