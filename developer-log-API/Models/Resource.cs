using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.Models
{
    public class Resource
    {
        [Key]
        public int ResourceId { get; set; }

        [Required]
        public string UserId { get; set; }

        //[JsonIgnore]
        public virtual User User { get; set; }

        [Required]
        public int ResourceTypeId { get; set; }

        public ResourceType ResourceType { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public virtual ICollection<ResourceTopic> ResourceTopics { get; set; }

        //[JsonIgnore]
        public virtual ICollection<ResourceAttributeValue> ResourceAttributeValues { get; set; }
    }
}

