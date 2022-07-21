using System;
using System.Collections.Generic;
using BookReads.Models;

namespace BookReads.Repositories
{
    public interface IBookStatusRepository
    {
        List<BookStatus> GetAllBookStatus();
        List<BookStatus> GetAllBookStatusByBookId(int id);
        void AddBookStatus(BookStatus bookStatus);
        void DeleteBookStatus(int id);
    }
}
