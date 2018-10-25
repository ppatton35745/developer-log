using System.ComponentModel.DataAnnotations;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.Models
{
    public class ResourceTopic
    {
        [Key]
        public int ResourceTopicID { get; set; }

        [Required]
        public int TopicID { get; set; }

        public Topic Topic { get; set; }

        [Required]
        public int ResourceID { get; set; }

        public Resource Resource { get; set; }

    }

}


