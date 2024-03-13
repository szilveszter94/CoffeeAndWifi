namespace CafeAndWifi.Model;

public interface IComment
{
    int Id { get; set; }
    int CafeId { get; set; }
    string AuthorId { get; set; }
    string Text { get; set; }
    DateTime Date { get; set; }
    Cafe Cafe { get; set; }
}