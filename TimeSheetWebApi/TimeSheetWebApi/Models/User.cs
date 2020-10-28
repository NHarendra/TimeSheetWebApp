using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeSheetWebApi.Models
{
    public class User : BaseEntity
    {
        public virtual String FullName { get; set; }
        public virtual String Email { get; set; }
        public virtual String PhoneNumber { get; set; }
        public virtual bool IsActive { get; set; }

        public virtual String Designation { get; set; }

    }
}
