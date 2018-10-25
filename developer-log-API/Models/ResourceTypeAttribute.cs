using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace developer-log-API.Models
{
    public class ResourceTypeAttribute
{
    [Key]
    public int ResourceTypeAttributeID { get; set; }

    [Required]
    public int ResourceTypeID { get; set; }

    [Required]
    public int ResourceAttributeID { get; set; }
}
}
