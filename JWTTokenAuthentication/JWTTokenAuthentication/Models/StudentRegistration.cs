using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JWTTokenAuthentication.Models
{
    public class StudentRegistration
    {
        public Registration Registration { get; set; }
        public StudentAssignCourse StudentAssignCourse { get; set; }
    }
}
