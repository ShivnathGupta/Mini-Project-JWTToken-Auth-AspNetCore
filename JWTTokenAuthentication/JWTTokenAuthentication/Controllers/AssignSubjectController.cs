using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JWTTokenAuthentication.Models;
using Microsoft.AspNetCore.Authorization;

namespace JWTTokenAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    public class AssignSubjectController : ControllerBase
    {
        readonly MonikaContext db = new MonikaContext();


        [Route("ActiveAssignSubject")]
        [HttpPut]
        public object ActiveAssignSubject(AssignSubject assignSubject)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var request = db.AssignSubject.Where(c => c.Assignid.Equals(assignSubject.Assignid));
                    if (request != null && assignSubject.IsActive != null)
                    {
                        AssignSubject data = new AssignSubject
                        {
                            Assignid = assignSubject.Assignid,
                            IsActive = assignSubject.IsActive
                        };
                        db.Entry(data).Property("IsActive").IsModified = true;
                        db.SaveChanges();
                        return new ResponseClass
                        {
                            Status = 200,
                            Message = "Assign Subject Updated SuccessFully",
                            Response = null
                        };

                    }
                    else
                    {
                        return new ResponseClass
                        {
                            Status = 403,
                            Message = "Server down please try after some time Name",
                            Response = null
                        };
                    }

                }
                else
                {
                    return new ResponseClass { Status = 400, Message = "Data Not Valid", Response = null };
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        [Route("AssignSubject")]
        [HttpPost]
        public object AssignSubject(AssignSubject assignSubject)
        {
            try
            {
                if (ModelState.IsValid)
                {

                        db.AssignSubject.Add(assignSubject);
                        db.SaveChanges();
                        return new ResponseClass
                        {
                            Status = 200,
                            Message = "Assign Subject SuccessFully",
                            Response = null
                        };

                }
                else
                {
                    return new ResponseClass { Status = 400, Message = "Data Not Valid", Response = null };
                }
            }      
            catch (Exception e)
            {
                throw e;
            }
        }

        [Route("UpdateAssignSubject")]
        [HttpPut]
        public object UpdateAssignSubject(AssignSubject assignSubject)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    db.Entry(assignSubject).Property("Subjectidref").IsModified = true;
                    db.SaveChanges();
                    return new ResponseClass
                    {
                        Status = 200,
                        Message = "Assign Subject Updated cessFully",
                        Response = null
                    };

                }
                else
                {
                    return new ResponseClass { Status = 400, Message = "Data Not Valid", Response = null };
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}