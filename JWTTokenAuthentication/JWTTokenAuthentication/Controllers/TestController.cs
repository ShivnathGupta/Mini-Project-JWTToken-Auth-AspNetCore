using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using JWTTokenAuthentication.Models;

namespace JWTTokenAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class TestController : ControllerBase
    {
        readonly MonikaContext db = new MonikaContext();
        [Route("AddTest")]
        [HttpPost]
        public object AddTest(Test test)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Test.Add(test);
                    db.SaveChanges();
                    return new ResponseClass { Status = 200, Message = "Test Added Successfully", Response = null };
                }
                else
                {
                    return new ResponseClass
                    {
                        Status = 403,
                        Message = "Data not valid",
                        Response = null
                    };

                }

            }
            catch(Exception e)
            {
                return new ResponseClass
                {
                    Status = 400,
                    Message = e.Message,
                    Response = null
                };
            }
        }
    }
}