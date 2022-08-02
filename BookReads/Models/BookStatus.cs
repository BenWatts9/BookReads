using System;
using BookReads.Models;
using System.Collections.Generic;

namespace BookReads.Models
{
    public class BookStatus
    {
        public int Id { get; set; }
        public DateTime StartedOnDate  { get; set; }
        public DateTime FinishedOnDate { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public int BookId { get; set; }
        public int UserProfileId { get; set; }
        public List<Group> Groups { get; set; }

    }
}
