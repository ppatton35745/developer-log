using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.ApiModels
{
    public class aTopic
    {
        [Key]
        public int TopicId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }
    }
}
