using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.Models
{
    public class ResourceAttribute
    {
        [Key]
        public int ResourceAttributeId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public virtual ICollection<ResourceTypeAttribute> ResourceTypeAttributes { get; set; }
    }
}


