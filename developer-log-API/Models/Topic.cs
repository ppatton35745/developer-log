﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer_log_API.Models
{
    public class Topic
    {
        [Key]
        public int TopicID { get; set; }

        [Required]
        public int UserID { get; set; }

        public User User { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public virtual ICollection<ResourceTopic> ResourceTopics { get; set; }
    }
}
