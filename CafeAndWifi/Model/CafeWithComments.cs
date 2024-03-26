using CafeAndWifi.Model.AuthenticationModels;

namespace CafeAndWifi.Model;

public record CafeWithComments(ICafe Cafe, List<CommentWithUser> Comments);