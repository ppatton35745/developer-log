using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.ApiModels
{
    public class aResource
    {
        [Key]
        public int ResourceId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public Dictionary<string, string> Attributes { get; set; } = new Dictionary<string, string>();
       
    }
}
