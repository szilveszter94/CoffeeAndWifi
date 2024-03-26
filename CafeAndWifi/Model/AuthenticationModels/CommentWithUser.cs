namespace CafeAndWifi.Model.AuthenticationModels;

public class CommentWithUser
{
    public Comment Comment { get; set; }
    public User User { get; set; }
    
    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
        {
            return false;
        }
        
        CommentWithUser other = (CommentWithUser)obj;

        return Comment.Id == other.Comment.Id &&
               User.Id == other.User.Id;
    }
}