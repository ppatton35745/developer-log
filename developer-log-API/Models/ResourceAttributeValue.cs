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
        public int ResourceAttributeValueID { get; set; }

        [Required]
        public int ResourceTypeAttributeID { get; set; }

        [Required]
        public int ResourceID { get; set; }

        [Required]
        [StringLength(50)]
        public string Value { get; set; }
    }
}
