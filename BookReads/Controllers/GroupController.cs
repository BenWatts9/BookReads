using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookReads.Models;
using BookReads.Repositories;
using System;


namespace BookReads.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;

        public GroupController(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_groupRepository.GetAllGroups());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_groupRepository.GetUserGroups(id));
        }

        [HttpPost]
        public IActionResult Post(Group group)
        {
            _groupRepository.AddGroup(group);
            return CreatedAtAction("Get", new { id = group.Id }, group);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _groupRepository.RemoveGroup(id);
            return NoContent();
        }

        [HttpGet("GroupByBookStatus/{id}")]
        public IActionResult GetGroupByBookStatusId(int id)
        {
            return Ok(_groupRepository.GetGroupsByBookStatusId(id));
        }
    }
}
