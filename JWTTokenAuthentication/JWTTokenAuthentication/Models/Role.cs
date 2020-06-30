using System;
using System.Collections.Generic;

namespace JWTTokenAuthentication.Models
{
    public partial class Role
    {
        public Role()
        {
            Registration = new HashSet<Registration>();
        }

        public int Roleid { get; set; }
        public string Rolename { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<Registration> Registration { get; set; }
    }
}
