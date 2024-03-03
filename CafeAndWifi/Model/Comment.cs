namespace CafeAndWifi.Model;

public class Comment : IComment
{
    public int Id {get; init;}
    public int CafeId {get; init; }
    public string AuthorId { get; init; }
    public string Text { get; init; }
    public DateTime Date { get; init; }
    
    public Cafe Cafe { get; init; }
}