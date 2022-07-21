using System;
using System.Collections.Generic;
using BookReads.Models;

namespace BookReads.Repositories
{
    public interface IBookRepository
    {
        List<Book> GetAllBooks();
        Book GetBookById(int id);
    }
}
