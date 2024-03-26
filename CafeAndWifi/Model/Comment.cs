namespace CafeAndWifi.Model;

public class Comment : IComment
{
    public int Id {get; set;}
    public int CafeId {get; set; }
    public string AuthorId { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }
    public Cafe Cafe { get; set; } = null!;
    
    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
        {
            return false;
        }
        
        Comment other = (Comment)obj;

        return Id == other.Id &&
               CafeId == other.CafeId &&
               AuthorId == other.AuthorId &&
               Text == other.Text &&
               Date == other.Date;
    }
}