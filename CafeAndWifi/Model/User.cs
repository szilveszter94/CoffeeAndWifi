namespace CafeAndWifi.Model;

public class User : IUser
{
    public string Email { get; set; }
    public string UserName { get; set; }
    public string Id { get; set; }
    
    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
        {
            return false;
        }
        
        User other = (User)obj;

        return Id == other.Id &&
               Email == other.Email &&
               UserName == other.UserName;
    }
}