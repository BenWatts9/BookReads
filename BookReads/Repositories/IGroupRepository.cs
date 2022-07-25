using System;
using System.Collections.Generic;
using BookReads.Models;

namespace BookReads.Repositories
{
    public interface IGroupRepository
    {

        List<Group> GetAllGroups();
        List<Group> GetUserGroups(int id);
        void AddGroup(Group group);
        void RemoveGroup(int id);
    }
}
