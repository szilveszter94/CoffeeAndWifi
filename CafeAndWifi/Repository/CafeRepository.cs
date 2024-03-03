using CafeAndWifi.Context;
using CafeAndWifi.Model;

namespace CafeAndWifi.Repository;

public class CafeRepository : ICafeRepository
{
    private readonly CafeContext _context;

    public CafeRepository(CafeContext context)
    {
        _context = context;
    }
    
    public List<Cafe> GetCafes()
    {
        try
        {
            return _context.Cafes.ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Cannot get cafes, an error occurred.");
        }
    }

    public Cafe? GetCafeById(int id)
    {
        try
        {
            return _context.Cafes.FirstOrDefault(cafe => cafe.Id == id);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Cannot get cafe, an error occured.");
        }
        
    }

    public Cafe AddCafe(Cafe cafe)
    {
        try
        {
            _context.Cafes.Add(cafe);
            _context.SaveChanges();

            return cafe;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw new Exception("Cafe not created. An error occurred.");
        }
    }
    
    public Cafe EditCafe(Cafe updatedCafe)
    {
        try
        {
            var existingCafe = _context.Cafes.FirstOrDefault(c => c.Id == updatedCafe.Id);

            if (existingCafe == null)
            {
                throw new KeyNotFoundException("Failed to update. Cafe not found.");
            }
            
            _context.Entry(existingCafe).CurrentValues.SetValues(updatedCafe);
            _context.SaveChanges();

            return updatedCafe;
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
    
    public void DeleteCafe(int id)
    {
        try
        {
            var cafeToDelete = _context.Cafes.FirstOrDefault(c => c.Id == id);

            if (cafeToDelete == null)
            {
                throw new KeyNotFoundException("Failed to delete. Cafe not found.");
            }
            
            _context.Cafes.Remove(cafeToDelete);
            _context.SaveChanges();
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