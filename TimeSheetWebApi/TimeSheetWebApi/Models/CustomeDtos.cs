using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeSheetWebApi.Models
{
    public class CustomeDtos
    {
    }

    public class TimeSheetCustomeDtoReturn
    {

        public virtual string UserName { get; set; }

        public virtual string Designation { get; set; }

        public virtual DateTime StartDateTime { get; set; }

        public virtual int? HoursWorked { get; set; }

        public virtual bool IsActive { get; set; }

    }

    public class LookupDto
    {
        public int value { get; set; }

        public string label { get; set; }
    }
}
