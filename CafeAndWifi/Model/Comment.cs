

namespace CafeAndWifi.Model;

public class Comment : IComment
{
    public int Id {get; set;}
    public int CafeId {get; set; }
    public string AuthorId { get; set; }
    public string Text { get; set; }
    public DateTime Date { get; set; }
    public Cafe Cafe { get; set; } = null!;
}