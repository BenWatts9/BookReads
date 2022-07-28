using System.Collections.Generic;

namespace BookReads.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public string ImageLocation { get; set; }

        public List<Group> Groups { get; set; }
    }
}
