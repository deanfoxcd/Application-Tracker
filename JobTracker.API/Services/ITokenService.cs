using JobTracker.API.Models;

namespace JobTracker.API.Services;

public interface ITokenService
{
    string GenerateToken(User user);
}
