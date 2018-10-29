using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.Models
{
    public class ResourceTypeAttribute
    {
        [Key]
        public int ResourceTypeAttributeId { get; set; }

        [Required]
        public int ResourceTypeId { get; set; }

        //[JsonIgnore]
        public ResourceType ResourceType { get; set; }

        [Required]
        public int ResourceAttributeId { get; set; }

        public ResourceAttribute ResourceAttribute { get; set; }

        //[JsonIgnore]
        public virtual ICollection<ResourceAttributeValue> ResourceAttributeValues { get; set; }
    }
}
