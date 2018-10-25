using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.Models
{
    public class ResourceType
    {
        [Key]
        public int ResourceTypeId { get; set; }

        [Required]
        public int Name { get; set; }

        public virtual ICollection<Resource> Resources { get; set; }
        public virtual ICollection<ResourceTypeAttribute> ResourceTypeAttributes { get; set; }
    }
}
