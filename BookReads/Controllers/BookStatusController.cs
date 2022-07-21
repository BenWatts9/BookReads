using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookReads.Repositories;
using System;
using BookReads.Models;

namespace BookReads.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookStatusController : ControllerBase
    {
        private readonly IBookStatusRepository _bookStatusRepository;
        public BookStatusController(IBookStatusRepository bookStatusRepository)
        {
            _bookStatusRepository = bookStatusRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_bookStatusRepository.GetAllBookStatus());
        }

        [HttpGet("{id}")]
        public IActionResult GetStatusByBook(int id)
        {
            return Ok(_bookStatusRepository.GetAllBookStatusByBookId(id));
        }

        [HttpPost]
        public IActionResult Post(BookStatus bookStatus)
        {
            bookStatus.StartedOnDate = DateTime.Now;
            _bookStatusRepository.AddBookStatus(bookStatus);
            return CreatedAtAction("Get", new { id = bookStatus.Id }, bookStatus);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _bookStatusRepository.DeleteBookStatus(id);
            return NoContent();
        }
    }
}
