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
        public int ResourceTopicId { get; set; }

        [Required]
        public int TopicId { get; set; }

        public Topic Topic { get; set; }

        [Required]
        public int ResourceId { get; set; }

        public Resource Resource { get; set; }

    }

}


