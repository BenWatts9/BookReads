using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using BookReads.Models;
using BookReads.Utils;

namespace BookReads.Repositories
{
    public class BookRepository : BaseRepository, IBookRepository
    {
        public BookRepository(IConfiguration config) : base(config) { }

        public List<Book> GetAllBooks()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
	                        Id,
	                        Title,
	                        Author,
	                        Genre,
	                        ImageLocation
                        FROM Book;";

                    var reader = cmd.ExecuteReader();

                    var books = new List<Book>();

                    while(reader.Read())
                    {
                        books.Add(new Book()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Author = reader.GetString(reader.GetOrdinal("Author")),
                            Genre = reader.GetString(reader.GetOrdinal("Genre")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"))
                        });
                    }

                    return books;
                }
            }

        }
        public Book GetBookById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
	                        Id,
	                        Title,
	                        Author,
	                        Genre,
	                        ImageLocation
                        FROM Book;";

                    cmd.Parameters.AddWithValue("id", id);
                    var reader = cmd.ExecuteReader();

                    Book book = null;

                    if (reader.Read())
                    {
                        book = new Book()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Title = reader.GetString(reader.GetOrdinal("Title")),
                            Author = reader.GetString(reader.GetOrdinal("Author")),
                            Genre = reader.GetString(reader.GetOrdinal("Genre")),
                            ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation"))
                        };
                    }
                    return book;
                }
            }
        }
       
    }
}
