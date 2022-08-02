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
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        public GroupRepository(IConfiguration config) : base(config) { }


        public List<Group> GetAllGroups()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM [Group]";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Group> groups = new List<Group>();

                        while (reader.Read())
                        {
                            Group group = new Group()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                            };
                            groups.Add(group);
                        }
                        return groups;
                    }
                }
            }
        }


        public List<Group> GetUserGroups(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT 
	                                Id,
	                                Name,
                                    UserProfileId
                                FROM [Group]
                                WHERE UserProfileId = @id
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    var groups = new List<Group>();

                    while (reader.Read())
                    {
                        var group = new Group()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                        };
                        groups.Add(group);
                    }

                    reader.Close();

                    return groups;
                }
            }
        }
        public void AddGroup(Group group)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Group] (Name, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @UserProfileId);
                        ";

                    DbUtils.AddParameter(cmd, "@Name", group.Name);
                    DbUtils.AddParameter(cmd, "@UserProfileId", group.UserProfileId);

                    group.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void RemoveGroup(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM [Group] WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }

        }
        public List<Group> GetGroupsByBookStatusId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT 
	                                g.Id AS GroupId,
	                                g.Name,
                                    g.UserProfileId,
                                    bsg.BookStatusId
                                FROM [Group] g
                                LEFT JOIN BookStatusGroup bsg ON g.Id = bsg.GroupId
                                WHERE BookStatusId = @id
                                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    var groups = new List<Group>();

                    while (reader.Read())
                    {
                        var group = new Group()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("GroupId")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                        };
                        groups.Add(group);
                    }

                    reader.Close();

                    return groups;
                }
            }
        }
    }
}
