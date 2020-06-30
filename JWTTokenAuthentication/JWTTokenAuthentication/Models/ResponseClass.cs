using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JWTTokenAuthentication.Models
{
    public class ResponseClass
    {
       
        public object Status { get; set; }
        public string Message { get; set; }
        public object Response { get; set; }
    }
}
