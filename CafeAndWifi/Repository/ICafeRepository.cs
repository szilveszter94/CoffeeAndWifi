using CafeAndWifi.Model;
using CafeAndWifi.Model.AuthenticationModels;

namespace CafeAndWifi.Repository;

public interface ICafeRepository
{
    Task<List<Cafe>> GetCafes();
    Task<CafeWithPopulatedUsers?> GetCafeById(int id);
    Task<Cafe> AddCafe(Cafe cafe);
    Task<Comment> AddComment(CommentRequest request);
    Task<Cafe> EditCafe(Cafe cafe);
    Task DeleteCafe(int id);
}