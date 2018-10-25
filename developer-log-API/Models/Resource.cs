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
        public int ResourceID { get; set; }

        [Required]
        public int UserID { get; set; }

        [Required]
        public int ResourceTypeID { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }
    }
}

