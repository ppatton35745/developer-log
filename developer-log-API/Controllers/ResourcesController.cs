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
using Dapper;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Cors;

namespace developer_log_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("DeveloperLogPolicy")]
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
        public async Task<IActionResult> GetResources(int? resourceTypeId, int? topicId)
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
	                            JOIN ResourceAttributeValue rav on rav.ResourceTypeAttributeId = rta.ResourceTypeAttributeId and rav.ResourceId = r.ResourceId
                                LEFT JOIN ResourceTopic rtop on rtop.ResourceId = r.ResourceId
                            WHERE 1=1 ";

            if (resourceTypeId != null)
            {
                sql += $"AND rt.ResourceTypeId = {resourceTypeId} ";
            }

            if (topicId != null)
            {
                sql += $"AND rtop.TopicId = {topicId} ";
            }

            sql += $@"GROUP BY rt.ResourceTypeId
	                    ,rt.Name 
	                    ,rta.ResourceTypeAttributeId
	                    ,ra.ResourceAttributeId
	                    ,ra.Name 
	                    ,r.ResourceId
	                    ,r.Name 
	                    ,rav.ResourceAttributeValueId
	                    ,rav.Value";

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
                        }

                        ResourceTypeAttribute thisResourceTypeAttribute;

                        // has this resource type attribute already been added to this resourceType??
                        if (!resourceTypeAttributes.TryGetValue(resourceTypeAttribute.ResourceTypeAttributeId, out thisResourceTypeAttribute))
                        {
                            // resource type attribute has not been assigned to resource type, assign to placeholder
                            thisResourceTypeAttribute = resourceTypeAttribute;

                            // Assign attribute for ease of use
                            thisResourceTypeAttribute.ResourceAttribute = resourceAttribute;
                            thisResourceTypeAttribute.ResourceAttributeId = resourceAttribute.ResourceAttributeId;

                            // add this resource type attribute to the resource type
                            thisResourceType.ResourceTypeAttributes.Add(thisResourceTypeAttribute);
                            // add to the resource type attribute dictionary, already on resource type
                            resourceTypeAttributes.Add(thisResourceTypeAttribute.ResourceTypeAttributeId, thisResourceTypeAttribute);
                        }

                        Resource thisResource;

                        // has this resource already been added to this resourceType??
                        if (!resources.TryGetValue(resource.ResourceId, out thisResource))
                        {
                            
                            // resource has not been assigned to resource type, assign to placeholder
                            thisResource = resource;

                            // instantiate list for attribute values for resource
                            thisResource.ResourceAttributeValues = new List<ResourceAttributeValue>();
                            
                            // add this resource to the resource type
                            thisResourceType.Resources.Add(thisResource);
                            
                            // add to the resource dictionary, already on resource type
                            resources.Add(thisResource.ResourceId, thisResource);
                        }

                        // resource attribute values are lowest layer of query will be unique no need to test
                        thisResourceTypeAttribute.ResourceAttribute = resourceAttribute;
                        resourceAttributeValue.ResourceTypeAttribute = thisResourceTypeAttribute;
                        resourceAttributeValue.ResourceTypeAttributeId = resourceTypeAttribute.ResourceTypeAttributeId;
                        
                        thisResource.ResourceAttributeValues.Add(resourceAttributeValue);

                        return thisResourceType;
                    }, splitOn: "ResourceTypeAttributeId,ResourceAttributeId,ResourceId,ResourceAttributeValueId");
                return Ok(resourceTypeQuery.Distinct());
            }
        }

        // GET: api/Resources/5
        [HttpGet("{id}", Name = "GetResource")]
        [Authorize]
        public async Task<IActionResult> GetResource([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var resource = await _context.Resource
            .Include(x => x.ResourceType)
                .ThenInclude(y => y.ResourceTypeAttributes)
                    .ThenInclude(z => z.ResourceAttribute)
            .Include(x => x.ResourceTopics)
                .ThenInclude(y => y.Topic)
            .Include(x => x.ResourceAttributeValues)
            .Where(x => x.ResourceId == id)
            .SingleAsync();

            if (resource == null)
            {
                return NotFound();
            }

            return Ok(resource);
        }

        // PUT: api/Resource/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutResource([FromRoute] int id, [FromBody] Resource resource)
        {
            int resourceUpdated;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != resource.ResourceId)
            {
                return BadRequest();
            } 

            string sql = $@"DELETE rt
                        FROM ResourceTopic rt
                        WHERE rt.ResourceId = {id} ";

            sql += $@"DELETE 
                        FROM ResourceAttributeValue
                        WHERE ResourceId = {id} ";

            string sql2 = $@"UPDATE r
                            SET r.Name = '{resource.Name}'
                            FROM [Resource] r
                            WHERE ResourceId = {id} ";

            Console.WriteLine(sql);

            using (IDbConnection conn = Connection)
            {
                await conn.ExecuteAsync(sql);
                resourceUpdated = await conn.ExecuteAsync(sql2);
            }

            if (resource.ResourceTopics.Count > 0)
            {


                sql = $@"INSERT INTO ResourceTopic
                            (ResourceId, TopicId)
                            VALUES ";

                for (int i = 0; i < resource.ResourceTopics.Count; i++)
                {
                    if (i == 0)
                    {
                        sql += $"({resource.ResourceId}, {resource.ResourceTopics.ElementAt(i).TopicId}) ";
                    }
                    else
                    {
                        sql += $",({resource.ResourceId}, {resource.ResourceTopics.ElementAt(i).TopicId}) ";
                    }
                }

                sql += $"SELECT Max(ResourceTopicId) FROM ResourceTopic;";

                using (IDbConnection conn = Connection)
                {
                    var resourceTopicId = (await conn.QueryAsync<int>(sql)).Single();
                }

            }

            if (resource.ResourceAttributeValues.Count > 0)
            {
                sql = $@"INSERT INTO ResourceAttributeValue
                ( ResourceId, ResourceTypeAttributeId, Value)
                VALUES ";

                for (int i = 0; i < resource.ResourceAttributeValues.Count; i++)
                {
                    if (i == 0)
                    {
                        sql += $@"({resource.ResourceId}, 
                                {resource.ResourceAttributeValues.ElementAt(i).ResourceTypeAttributeId},
                                '{resource.ResourceAttributeValues.ElementAt(i).Value}') ";
                    }
                    else
                    {
                        sql += $@",({resource.ResourceId}, 
                                {resource.ResourceAttributeValues.ElementAt(i).ResourceTypeAttributeId},
                                '{resource.ResourceAttributeValues.ElementAt(i).Value}') ";
                    }
                }

                sql += $"SELECT Max(ResourceAttributeValueId) FROM ResourceAttributeValue;";

                using (IDbConnection conn = Connection)
                {
                    var resourceAttributeValueId = (await conn.QueryAsync<int>(sql)).Single();
                }
            }

            if (resourceUpdated > 0)
            {
                return new StatusCodeResult(StatusCodes.Status204NoContent);
            }
            else
            {
                throw new Exception("No rows affected");
            }
        }

        // POST: api/Resources
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostResource([FromBody] Resource resource)
        {
            string userName = User.Identity.Name;
            User user = _context.User.Single(u => u.UserName == userName);

            string sql = $@"INSERT INTO Resource
            (UserId, ResourceTypeId, Name)
            VALUES
            ('{user.Id}', '{resource.ResourceTypeId}', '{resource.Name}');
            select MAX(ResourceId) from Resource";

            using (IDbConnection conn = Connection)
            {
                var resourceId = (await conn.QueryAsync<int>(sql)).Single();
                resource.ResourceId = resourceId;
                //return CreatedAtRoute("GetResource", new { id = resourceId }, resource);
            }

            sql = $@"INSERT INTO ResourceTopic
            (ResourceId, TopicId)
            VALUES ";

            for (int i = 0; i < resource.ResourceTopics.Count; i++)
            {
                if (i == 0)
                {
                    sql += $"({resource.ResourceId}, {resource.ResourceTopics.ElementAt(i).TopicId}) ";
                }
                else
                {
                    sql += $",({resource.ResourceId}, {resource.ResourceTopics.ElementAt(i).TopicId}) ";
                }
            }

            sql += $"SELECT Max(ResourceTopicId) FROM ResourceTopic;";

            using (IDbConnection conn = Connection)
            {
                var resourceTopicId = (await conn.QueryAsync<int>(sql)).Single();
                //return CreatedAtRoute("GetResource", new { id = resourceId }, resource);
            }

            sql = $@"INSERT INTO ResourceAttributeValue
            ( ResourceId, ResourceTypeAttributeId, Value)
            VALUES ";

            for (int i = 0; i < resource.ResourceAttributeValues.Count; i++)
            {
                if (i == 0)
                {
                    sql += $@"({resource.ResourceId}, 
                                {resource.ResourceAttributeValues.ElementAt(i).ResourceTypeAttributeId},
                                '{resource.ResourceAttributeValues.ElementAt(i).Value}') ";
                }
                else
                {
                    sql += $@",({resource.ResourceId}, 
                                {resource.ResourceAttributeValues.ElementAt(i).ResourceTypeAttributeId},
                                '{resource.ResourceAttributeValues.ElementAt(i).Value}') ";
                }
            }

            sql += $"SELECT Max(ResourceAttributeValueId) FROM ResourceAttributeValue;";

            Console.WriteLine(sql);
            Console.ReadLine();

            using (IDbConnection conn = Connection)
            {
                var resourceAttributeValueId = (await conn.QueryAsync<int>(sql)).Single();
                return CreatedAtRoute("GetResource", new { id = resource.ResourceId }, resource);
            }
            
        }

        // DELETE: api/Topics/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteResource([FromRoute] int id)
        {
            string sql = $@"
                DELETE FROM [ResourceTopic] WHERE ResourceId = {id};
                DELETE FROM ResourceAttributeValue WHERE ResourceId = {id};
                DELETE FROM [Resource] WHERE ResourceId = {id};";

            using (IDbConnection conn = Connection)
            {
                int resourceDeleted = await conn.ExecuteAsync(sql);
                if (resourceDeleted > 0)
                {
                    return new StatusCodeResult(StatusCodes.Status204NoContent);
                }
                throw new Exception("No rows affected");
            }
        }

        private bool ResourceExists(int id)
        {
            return _context.Resource.Any(e => e.ResourceId == id);
        }
    }
}