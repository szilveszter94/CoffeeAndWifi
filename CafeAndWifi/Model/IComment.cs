namespace CafeAndWifi.Model;

public interface IComment
{
    int Id { get; init; }
    int CafeId { get; init; }
    int AuthorId { get; init; }
    string Text { get; init; }
    DateTime Date { get; init; }
}