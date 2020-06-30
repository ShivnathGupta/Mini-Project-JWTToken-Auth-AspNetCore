using System;
using System.Collections.Generic;

namespace JWTTokenAuthentication.Models
{
    public partial class Subject
    {
        public Subject()
        {
            AssignSubject = new HashSet<AssignSubject>();
            StudentRemarks = new HashSet<StudentRemarks>();
            Test = new HashSet<Test>();
        }

        public int Subjectid { get; set; }
        public string Sname { get; set; }
        public bool? IsActive { get; set; }
        public int? Courseidref { get; set; }

        public virtual Course CourseidrefNavigation { get; set; }
        public virtual ICollection<AssignSubject> AssignSubject { get; set; }
        public virtual ICollection<StudentRemarks> StudentRemarks { get; set; }
        public virtual ICollection<Test> Test { get; set; }
    }
}
