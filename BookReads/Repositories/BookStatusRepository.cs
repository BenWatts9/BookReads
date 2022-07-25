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
    public class BookStatusRepository : BaseRepository, IBookStatusRepository
    {
        public BookStatusRepository(IConfiguration config) : base(config) { }

        public List<BookStatus> GetAllBookStatus()
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
	                        Id,
	                        BookId,
                            UserProfileId,
                            StartedOnDate,
                            FinishedOnDate,
                            Content,
                            Rating
                        FROM BookStatus;";

                    var reader = cmd.ExecuteReader();

                    var bookStatuses = new List<BookStatus>();

                    while (reader.Read())
                    {
                        bookStatuses.Add(new BookStatus()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            BookId = reader.GetInt32(reader.GetOrdinal("BookId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            StartedOnDate = reader.GetDateTime(reader.GetOrdinal("StartedOnDate")),
                            FinishedOnDate = reader.GetDateTime(reader.GetOrdinal("FinishedOnDate")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            Rating = reader.GetInt32(reader.GetOrdinal("Rating"))
                        });
                    }

                    return bookStatuses;
                }
            }
        }
        public List<BookStatus> GetAllBookStatusByBookId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
	                        bs.Id as BookStatusId,
	                        bs.BookId,
                            bs.UserProfileId,
                            bs.StartedOnDate,
                            bs.FinishedOnDate,
                            bs.Content,
                            bs.Rating,
	                        b.Title,
	                        b.Author,
	                        b.Genre,
	                        b.ImageLocation
                        FROM BookStatus bs
                            LEFT JOIN Book b ON bs.BookId = b.Id
                        WHERE bs.BookId = @id;";
                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var bookStatuses = new List<BookStatus>();

                    while (reader.Read())
                    {
                        bookStatuses.Add(new BookStatus()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("BookStatusId")),
                            BookId = reader.GetInt32(reader.GetOrdinal("BookId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            StartedOnDate = reader.GetDateTime(reader.GetOrdinal("StartedOnDate")),
                            FinishedOnDate = reader.GetDateTime(reader.GetOrdinal("FinishedOnDate")),
                            Content = reader.GetString(reader.GetOrdinal("Content")),
                            Rating = reader.GetInt32(reader.GetOrdinal("Rating"))
                        });
                    }

                    return bookStatuses;
                }
            }
        }

        public void AddBookStatus(BookStatus bookStatus)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO BookStatus (BookId, UserProfileId, StartedOnDate, FinishedOnDate, Content, Rating)
                        OUTPUT INSERTED.ID
                        VALUES (@BookId, @UserProfileId, @StartedOnDate, @FinishedOnDate, @Content, @Rating)";

                    DbUtils.AddParameter(cmd, "@BookId", bookStatus.BookId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", bookStatus.UserProfileId);
                    DbUtils.AddParameter(cmd, "@StartedOnDate", bookStatus.StartedOnDate);
                    DbUtils.AddParameter(cmd, "@FinishedOnDate", bookStatus.FinishedOnDate);
                    DbUtils.AddParameter(cmd, "@Content", bookStatus.Content);
                    DbUtils.AddParameter(cmd, "@Rating", bookStatus.Rating);

                    bookStatus.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void DeleteBookStatus(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM BookStatus WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateBookStatus(BookStatus bookStatus)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE BookStatus
                                        SET StartedOnDate = @StartedOnDate, 
                                            FinishedOnDate = @FinishedOnDate, 
                                            Content = @Content, 
                                            Rating = @Rating
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@StartedOnDate", bookStatus.StartedOnDate);
                    DbUtils.AddParameter(cmd, "@FinishedOnDate", bookStatus.FinishedOnDate);
                    DbUtils.AddParameter(cmd, "@Content", bookStatus.Content);
                    DbUtils.AddParameter(cmd, "@Rating", bookStatus.Rating);
                    DbUtils.AddParameter(cmd, "@Id", bookStatus.Id);

                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}
