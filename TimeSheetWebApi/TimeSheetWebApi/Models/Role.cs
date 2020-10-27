using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeSheetWebApi.Models
{
    public class Role : BaseEntity
    {
        public virtual String Name { get; set; }
        public virtual bool IsActive { get; set; }
    }
}
