using System;
using System.Collections.Generic;

namespace JWTTokenAuthentication.Models
{
    public partial class Course
    {
        public Course()
        {
            StudentAssignCourse = new HashSet<StudentAssignCourse>();
            Subject = new HashSet<Subject>();
        }

        public int Courseid { get; set; }
        public string Coursename { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<StudentAssignCourse> StudentAssignCourse { get; set; }
        public virtual ICollection<Subject> Subject { get; set; }
    }
}
