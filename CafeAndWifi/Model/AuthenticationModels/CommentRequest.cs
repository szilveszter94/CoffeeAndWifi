namespace CafeAndWifi.Model.AuthenticationModels;

public record CommentRequest(int CafeId, string AuthorId, string Text, DateTime Date);