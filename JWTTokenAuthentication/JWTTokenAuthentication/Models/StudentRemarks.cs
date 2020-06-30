using System;
using System.Collections.Generic;

namespace JWTTokenAuthentication.Models
{
    public partial class StudentRemarks
    {
        public int Studentremarkid { get; set; }
        public int? Regidref { get; set; }
        public int? Total { get; set; }
        public int? Obtained { get; set; }
        public int? Testidref { get; set; }
        public int? Subjectidref { get; set; }

        public virtual Registration RegidrefNavigation { get; set; }
        public virtual Subject SubjectidrefNavigation { get; set; }
        public virtual Test TestidrefNavigation { get; set; }
    }
}
