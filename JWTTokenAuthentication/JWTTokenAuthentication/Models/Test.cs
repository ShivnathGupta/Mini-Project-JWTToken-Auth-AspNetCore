using System;
using System.Collections.Generic;

namespace JWTTokenAuthentication.Models
{
    public partial class Test
    {
        public Test()
        {
            Question = new HashSet<Question>();
            StudentRemarks = new HashSet<StudentRemarks>();
        }

        public int Testid { get; set; }
        public string Testname { get; set; }
        public int? Assignidref { get; set; }
        public int? Subjectidref { get; set; }
        public bool? IsActive { get; set; }

        public virtual AssignSubject AssignidrefNavigation { get; set; }
        public virtual Subject SubjectidrefNavigation { get; set; }
        public virtual ICollection<Question> Question { get; set; }
        public virtual ICollection<StudentRemarks> StudentRemarks { get; set; }
    }
}
