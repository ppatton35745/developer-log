using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using developer_log_API.Data;
using developer_log_API.Models;
using developer_log_API.ApiModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Newtonsoft.Json;

namespace developer_log_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<User> _userManager;

        public ResourceTypesController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        // GET: api/ResourceTypes
        [HttpGet]
        [Authorize]
        public List<ResourceType> GetResourceTypes()
        {
            string userName = User.Identity.Name;
            User user = _context.User.Single(u => u.UserName == userName);

            List<ResourceType> items = _context.ResourceType
                .Where(x => x.Resources.Where(r => r.UserId == user.Id).Count() > 0)
                .ToList();

            return items;
        }

        // GET: api/Topics/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetResourceType([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var topic = await _context.Topic.FindAsync(id);

            if (topic == null)
            {
                return NotFound();
            }

            return Ok(topic);
        }

        // PUT: api/Topics/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutTopic([FromRoute] int id, [FromBody] Topic topic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != topic.TopicId)
            {
                return BadRequest();
            }

            _context.Entry(topic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Topics
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostTopic([FromBody] Topic topic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Topic.Add(topic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTopic", new { id = topic.TopicId }, topic);
        }

        // DELETE: api/Topics/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteTopic([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var topic = await _context.Topic.FindAsync(id);
            if (topic == null)
            {
                return NotFound();
            }

            _context.Topic.Remove(topic);
            await _context.SaveChangesAsync();

            return Ok(topic);
        }

        private bool TopicExists(int id)
        {
            return _context.Topic.Any(e => e.TopicId == id);
        }
    }
}