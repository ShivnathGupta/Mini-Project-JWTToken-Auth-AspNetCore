using System;
using System.Collections.Generic;

namespace JWTTokenAuthentication.Models
{
    public partial class Registration
    {
        public Registration()
        {
            AssignSubject = new HashSet<AssignSubject>();
            StudentAssignCourse = new HashSet<StudentAssignCourse>();
            StudentRemarks = new HashSet<StudentRemarks>();
        }

        public int Regid { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? Roleid { get; set; }
        public bool? IsActive { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<AssignSubject> AssignSubject { get; set; }
        public virtual ICollection<StudentAssignCourse> StudentAssignCourse { get; set; }
        public virtual ICollection<StudentRemarks> StudentRemarks { get; set; }
    }
}
