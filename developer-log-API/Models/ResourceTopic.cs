using System.ComponentModel.DataAnnotations;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace developer-log-API.Models
{
    public class ResourceTopic
{
    [Key]
    public int ResourceTopicID { get; set; }

    [Required]
    public int TopicID { get; set; }

    [Required]
    public int ResourceID { get; set; }

}

}


