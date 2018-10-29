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
using Dapper;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace developer_log_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourcesController : ControllerBase
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

        public ResourcesController(ApplicationDbContext context, UserManager<User> userManager, IConfiguration config)
        {
            _context = context;
            _userManager = userManager;
            _config = config;
        }

        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        [HttpGet]
        public async Task<IActionResult> Get(string topic)
        {
            string sql = $@"SELECT rt.ResourceTypeId
	                            ,rt.Name 
	                            ,rta.ResourceTypeAttributeId
	                            ,ra.ResourceAttributeId
	                            ,ra.Name 
	                            ,r.ResourceId
	                            ,r.Name 
	                            ,rav.ResourceAttributeValueId
	                            ,rav.Value 
                            FROM ResourceType rt
                            JOIN ResourceTypeAttribute rta on rta.ResourceTypeId = rt.ResourceTypeId
	                            JOIN ResourceAttribute ra on ra.ResourceAttributeId = rta.ResourceAttributeId
                            JOIN [Resource] r on r.ResourceTypeId = rt.ResourceTypeId
	                            JOIN ResourceAttributeValue rav on rav.ResourceTypeAttributeId = rta.ResourceTypeAttributeId and rav.ResourceId = r.ResourceId";

            Console.WriteLine(sql);

            using (IDbConnection conn = Connection)
            {
                Dictionary<int, ResourceType> resourceTypes = new Dictionary<int, ResourceType>();
                Dictionary<int, Resource> resources = new Dictionary<int, Resource>();
                Dictionary<int, ResourceTypeAttribute> resourceTypeAttributes = new Dictionary<int, ResourceTypeAttribute>();
                Dictionary<int, ResourceAttributeValue> resourceAttributeValues = new Dictionary<int, ResourceAttributeValue>();

                var resourceTypeQuery = await conn.QueryAsync<ResourceType, ResourceTypeAttribute, ResourceAttribute, Resource, ResourceAttributeValue, ResourceType>(
                    sql, (resourceType, resourceTypeAttribute, resourceAttribute, resource, resourceAttributeValue) =>
                    {

                        ResourceType thisResourceType;

                        if (!resourceTypes.TryGetValue(resourceType.ResourceTypeId, out thisResourceType))
                        {
                            // assign to placeholder
                            thisResourceType = resourceType;

                            // create new lists for new resource type
                            thisResourceType.ResourceTypeAttributes = new List<ResourceTypeAttribute>();
                            thisResourceType.Resources = new List<Resource>();

                            // add to resource types dictionary
                            resourceTypes.Add(thisResourceType.ResourceTypeId, thisResourceType);

                            //// new resource type, reset lists
                            //resources.Clear();
                            //resourceTypeAttributes.Clear();
                            //resourceAttributeValues.Clear();
                        }

                        ResourceTypeAttribute thisResourceTypeAttribute;

                        // has this resource type attribute already been added to this resourceType??
                        if (!resourceTypeAttributes.TryGetValue(resourceTypeAttribute.ResourceTypeAttributeId, out thisResourceTypeAttribute))
                        {
                            // resource type attribute has not been assigned to resource type, assign to placeholder
                            thisResourceTypeAttribute = resourceTypeAttribute;
                            thisResourceTypeAttribute.ResourceAttribute = resourceAttribute;
                            thisResourceTypeAttribute.ResourceAttributeId = resourceAttribute.ResourceAttributeId;

                            // add this resource type attribute to the resource type
                            thisResourceType.ResourceTypeAttributes.Add(thisResourceTypeAttribute);
                            // add to the resource type attribute dictionary, already on resource type
                            resourceTypeAttributes.Add(thisResourceTypeAttribute.ResourceTypeAttributeId, thisResourceTypeAttribute);
                        }

                        Resource thisResource;

                        // has this resource type attribute already been added to this resourceType??
                        if (!resources.TryGetValue(resource.ResourceId, out thisResource))
                        {
                            
                            // resource type attribute has not been assigned to resource type, assign to placeholder
                            thisResource = resource;
                            thisResource.ResourceAttributeValues = new List<ResourceAttributeValue>();
                            // add this resource type attribute to the resource type
                            thisResourceType.Resources.Add(thisResource);
                            // add to the resource type attribute dictionary, already on resource type
                            resources.Add(thisResource.ResourceId, thisResource);
                        }

                        thisResource.ResourceAttributeValues.Add(resourceAttributeValue);


                        //thisResourceType.ResourceTypeAttributes.Add(resourceTypeAttribute);
                        //thisResourceType.Resources.Add(resource);
                        return thisResourceType;
                    }, splitOn: "ResourceTypeAttributeId,ResourceAttributeId,ResourceId,ResourceAttributeValueId");
                return Ok(resourceTypeQuery.Distinct());
            }
        }


        //// GET: api/Topics
        //[HttpGet]
        //[Authorize]
        ////public IEnumerable<Topic> GetTopic()
        //public List<aResource> GetResources()
        //{
        //    string userName = User.Identity.Name;
        //    User user = _context.User.Single(u => u.UserName == userName);

        //    List<aResource> items = new List<aResource>();
        //    items = _context.Resource
        //        .Where(x => x.UserId == user.Id && x.ResourceId == 1)
        //                .Include(rav => rav.ResourceAttributeValues) // attribute values
        //                    .ThenInclude(rta => rta.ResourceTypeAttribute) // join between attributes and type
        //                        .ThenInclude(ra => ra.ResourceAttribute) // attribute names 
        //        .Select(x => new aResource
        //        {
        //            ResourceId = x.ResourceId,
        //            Name = x.Name,
        //            Attributes = x.ResourceAttributeValues.ToDictionary(d => d.ResourceTypeAttribute
        //                                                                    .ResourceAttribute
        //                                                                    .Name,
        //                                                                d => d.Value)
        //        })
        //        .ToList();

        //    return items;

        //    //shoppingCart.LineItems =
        //    //    from op in _context.OrderProduct
        //    //    join p in _context.Product
        //    //    on op.ProductId equals p.ProductId
        //    //    where op.OrderId == shoppingCart.Order.OrderId
        //    //    group new { p, op } by p into pList
        //    //    select new OrderLineItem()
        //    //    {
        //    //        Product = pList.Key,
        //    //        Units = pList.Select(x => x.p.ProductId).Count(),
        //    //        Cost = pList.Select(x => x.p.ProductId).Count() * pList.Key.Price,
        //    //        orderProducts = pList.Select(x => x.op).ToList()
        //    //    }
        //    //     ;

        //    //return _context.Resource
        //    //        .Where(t => t.UserId == user.Id)
        //    //        .Include(rt => rt.ResourceType)
        //    //        .Include(r => r.ResourceAttributeValues)
        //    //            .ThenInclude(rav => rav.ResourceTypeAttribute)
        //    //                .ThenInclude(ra => ra.ResourceAttribute)
        //    //        .ToList();

        //    //string userName = User.Identity.Name;
        //    //User user = _context.User.Single(u => u.UserName == userName);
        //    //var rTopics = _context.Topic
        //    //        .Where(t => t.UserId == user.Id);

        //    //var json = JsonConvert.SerializeObject(new { topics = rTopics });
        //    //return json;


        //    /* Example of customizing the JSON response
        //   var dbSongs = _context.Song
        //       .Include(s => s.Genre)
        //       .Include(s => s.Artist)
        //       .Include(s => s.Album)
        //       ;

        //   var json = JsonConvert.SerializeObject(new { songs = dbSongs });
        //   return json;
        //    */
        //}

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