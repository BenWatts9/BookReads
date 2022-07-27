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
        public IActionResult Get()
        {
            return Ok(_bookStatusRepository.GetAllBookStatus());
        }


        //Get by Book Id
        [HttpGet("{id}")]
        public IActionResult GetStatusByBook(int id)
        {
            return Ok(_bookStatusRepository.GetAllBookStatusByBookId(id));
        }

        [HttpGet("userGet/{id}")]
        public IActionResult GetStatusByUserProfile(int id)
        {
            return Ok(_bookStatusRepository.GetAllBookStatusByUserProfileId(id));
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

        [HttpPut("{id}")]
        public IActionResult Put(int id, BookStatus bookStatus)
        {
            if (id != bookStatus.Id)
            {
                return BadRequest();
            }

            _bookStatusRepository.UpdateBookStatus(bookStatus);
            return NoContent();
        }

        [HttpPost("AddGroupToBook/{id}")]
        public IActionResult AddGroupToBookStatus(int id, int groupId)
        {
            _bookStatusRepository.AddBookStatusGroup(id, groupId);
            return NoContent();
        }
    }
}
