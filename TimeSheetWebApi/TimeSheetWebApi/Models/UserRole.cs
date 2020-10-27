using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TimeSheetWebApi.Models
{
    public class UserRole : BaseEntity
    {
        public virtual int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User UserFk { get; set; }

        public virtual int? RoleId { get; set; }
        [ForeignKey("RoleId")]
        public User RoleFk { get; set; }
    }
}
