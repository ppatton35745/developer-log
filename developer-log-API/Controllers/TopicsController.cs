using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using developer_log_API.Data;
using developer_log_API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Dapper;

namespace developer_log_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("DeveloperLogPolicy")]
    public class TopicsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<User> _userManager;

        private readonly IConfiguration _config;

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public TopicsController(ApplicationDbContext context, UserManager<User> userManager, IConfiguration config)
        {
            _context = context;
            _userManager = userManager;
            _config = config;
        }

        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        // GET: api/Topics
        [HttpGet]
        [Authorize]
        //public IEnumerable<Topic> GetTopic()
        public List<Topic> GetTopic()
        {
            string userName = User.Identity.Name;
            User user = _context.User.Single(u => u.UserName == userName);

            List<Topic> items = _context.Topic
                .Where(x => x.UserId == user.Id)
                .ToList();

            return items;
        }

        // GET: api/Topics/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetTopic([FromRoute] int id)
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
            string userName = User.Identity.Name;
            User user = _context.User.Single(u => u.UserName == userName);

            topic.UserId = user.Id;

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
            string sql = $@"DELETE FROM ResourceTopic WHERE TopicId = {id}";

            using (IDbConnection conn = Connection)
            {
                await conn.ExecuteAsync(sql);
            }

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