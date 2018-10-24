using System.ComponentModel.DataAnnotations;

namespace developer_log_API.Models
{
    public class Artist {
        [Key]
        public int ArtistId {get;set;}

        [Required]
        [StringLength(20)]
        public string ArtistName {get;set;}

        [Required]
        public int YearEstablished {get;set;}
    }
}