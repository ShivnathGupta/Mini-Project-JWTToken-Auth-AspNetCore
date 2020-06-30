using System;
using System.Collections.Generic;

namespace JWTTokenAuthentication.Models
{
    public partial class AssignSubject
    {
        public AssignSubject()
        {
            Test = new HashSet<Test>();
        }

        public int Assignid { get; set; }
        public int? Regidref { get; set; }
        public int? Subjectidref { get; set; }
        public bool? IsActive { get; set; }

        public virtual Registration RegidrefNavigation { get; set; }
        public virtual Subject SubjectidrefNavigation { get; set; }
        public virtual ICollection<Test> Test { get; set; }
    }
}
