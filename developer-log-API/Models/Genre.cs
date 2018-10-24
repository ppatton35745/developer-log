using System.ComponentModel.DataAnnotations;

namespace developer_log_API.Models
{
    public class Genre {
        [Key]
        public int GenreId {get;set;}

        [Required]
        [StringLength(20)]
        public string Label {get;set;}
    }
}