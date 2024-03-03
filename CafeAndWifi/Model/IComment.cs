namespace CafeAndWifi.Model;

public interface IComment
{
    int Id { get; init; }
    int CafeId { get; init; }
    string AuthorId { get; init; }
    string Text { get; init; }
    Cafe Cafe { get; init; }
    DateTime Date { get; init; }
}