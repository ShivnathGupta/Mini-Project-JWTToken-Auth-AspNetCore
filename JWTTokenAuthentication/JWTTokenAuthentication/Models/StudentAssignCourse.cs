using System;
using System.Collections.Generic;

namespace JWTTokenAuthentication.Models
{
    public partial class StudentAssignCourse
    {
        public int Stdassignid { get; set; }
        public int? Regidref { get; set; }
        public int? Stdcourseid { get; set; }

        public virtual Registration RegidrefNavigation { get; set; }
        public virtual Course Stdcourse { get; set; }
    }
}
