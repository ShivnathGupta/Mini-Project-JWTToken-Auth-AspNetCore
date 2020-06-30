using System;
using System.Collections.Generic;

namespace JWTTokenAuthentication.Models
{
    public partial class Question
    {
        public int Questionid { get; set; }
        public string Question1 { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Answer { get; set; }
        public int? Testidref { get; set; }
        public bool? IsActive { get; set; }

        public virtual Test TestidrefNavigation { get; set; }
    }
}
