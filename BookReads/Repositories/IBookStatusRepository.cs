using System;
using System.Collections.Generic;
using BookReads.Models;

namespace BookReads.Repositories
{
    public interface IBookStatusRepository
    {
        List<BookStatus> GetAllBookStatus();
        BookStatus GetBookStatusById(int id);
        List<BookStatus> GetAllBookStatusByBookId(int id);
        List<BookStatus> GetAllBookStatusByUserProfileId(int id);
        void AddBookStatus(BookStatus bookStatus);
        void DeleteBookStatus(int id);
        void UpdateBookStatus(BookStatus bookStatus);
        void AddBookStatusGroup(int bookStatusId, int groupId);
        List<Book> GetAllBookStatusGroupBooksByGroupId(int id);
    }
}
