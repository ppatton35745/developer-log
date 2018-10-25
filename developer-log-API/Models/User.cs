using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace developer_log_API.Models
{
  public class User : IdentityUser
  {
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    public virtual ICollection<Topic> Topics { get; set; }

    public virtual ICollection<Resource> Resources { get; set; }
    }
}
