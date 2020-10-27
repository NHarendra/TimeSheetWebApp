using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TimeSheetWebApi.Models
{
    public class TimeSheet : BaseEntity
    {
        public virtual int? UserId { get; set; }
        [ForeignKey("UserId")]
        public  User UserFk { get; set; }

        public virtual DateTime StartDateTime { get; set; }

        public virtual int? HoursWorked { get; set; }

        public virtual bool IsActive { get; set; }

    }
}
