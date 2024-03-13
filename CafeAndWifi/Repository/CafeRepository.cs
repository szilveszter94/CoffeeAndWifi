using CafeAndWifi.Context;
using CafeAndWifi.Model;
using CafeAndWifi.Model.AuthenticationModels;
using Microsoft.EntityFrameworkCore;

namespace CafeAndWifi.Repository;

public class CafeRepository : ICafeRepository
{
    private readonly CafeContext _context;
    private readonly UserContext _userContext;

    public CafeRepository(CafeContext context, UserContext userContext)
    {
        _context = context;
        _userContext = userContext;
    }
    
    public async Task<List<Cafe>> GetCafes()
    {
        try
        {
            return await _context.Cafes.ToListAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Cannot get cafes, an error occurred.");
        }
    }

    public async Task<CafeWithPopulatedUsers?> GetCafeById(int id)
    {
        try
        {
            var cafeWithComments = await _context.Cafes
                .Include(cafe => cafe.Comments)
                .FirstOrDefaultAsync(cafe => cafe.Id == id);
            
            var commentsWithUsers = new List<object>();
            
            foreach (var comment in cafeWithComments.Comments)
            {
                var userInfo = await _userContext.Users.FirstOrDefaultAsync(u => u.Id == comment.AuthorId);
                var user = new User { Id = userInfo.Id, UserName = userInfo.UserName, Email = userInfo.Email };
    
                commentsWithUsers.Add(new {comment, user});
            }
            
            return new CafeWithPopulatedUsers(cafeWithComments, commentsWithUsers);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Cannot get cafe, an error occured.");
        }   
    }

    public async Task<Cafe> AddCafe(Cafe cafe)
    {
        try
        {
            await _context.Cafes.AddAsync(cafe);
            await _context.SaveChangesAsync();

            return cafe;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Cafe not created. An error occurred.");
        }
    }

    public async Task<Comment> AddComment(CommentRequest request)
    {
        try
        {
            var comment = new Comment
            {
                AuthorId = request.AuthorId, CafeId = request.CafeId, Date = request.Date, Text = request.Text
            };
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            return comment;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Comment not created. An error occurred.");
        }
    }
    
    public async Task<Cafe> EditCafe(Cafe updatedCafe)
    {
        try
        {
            var existingCafe = await _context.Cafes.FirstOrDefaultAsync(c => c.Id == updatedCafe.Id);

            if (existingCafe == null)
            {
                throw new KeyNotFoundException("Failed to update. Cafe not found.");
            }
            
            _context.Entry(existingCafe).CurrentValues.SetValues(updatedCafe);
            await _context.SaveChangesAsync();

            return existingCafe;
        }
        catch (KeyNotFoundException e)
        {
            Console.WriteLine(e);
            throw;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("An unexpected error occurred. Cafe not updated.");
        }
    }
    
    public async Task DeleteCafe(int id)
    {
        try
        {
            var cafeToDelete = await _context.Cafes.FirstOrDefaultAsync(c => c.Id == id);

            if (cafeToDelete == null)
            {
                throw new KeyNotFoundException("Failed to delete. Cafe not found.");
            }
            
            _context.Cafes.Remove(cafeToDelete);
            await _context.SaveChangesAsync();
        }
        catch (KeyNotFoundException e)
        {
            Console.WriteLine(e);
            throw;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("An unexpected error occurred during delete.");
        }
    }
}