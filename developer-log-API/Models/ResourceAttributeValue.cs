using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.Models
{
    public class ResourceAttributeValue
    {
        [Key]
        public int ResourceAttributeValueId { get; set; }

        [Required]
        public int ResourceTypeAttributeId { get; set; }

        public ResourceTypeAttribute ResourceTypeAttribute { get; set; }

        [Required]
        public int ResourceId { get; set; }

        public Resource Resource { get; set; }

        [Required]
        [StringLength(50)]
        public string Value { get; set; }
    }
}
