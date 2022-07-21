using BookReads.Models;
using System.Collections.Generic;

namespace BookReads.Repositories
{
    public interface IUserProfileRepository
    {
        
        UserProfile GetByFirebaseUserId(string firebaseUserId);
       
       
    }
}
