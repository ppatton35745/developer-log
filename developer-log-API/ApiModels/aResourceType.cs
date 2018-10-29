using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.ApiModels
{
    public class aResourceType
    {
        [Key]
        public int ResourceTypeId { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
