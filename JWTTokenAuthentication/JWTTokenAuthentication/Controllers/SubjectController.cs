using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JWTTokenAuthentication.Models;

namespace JWTTokenAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class SubjectController : ControllerBase
    {
        readonly MonikaContext db = new MonikaContext();


        [Route("GetSubject")]
        [HttpGet]
        public object GetAllSubject()
        {
            var result = from Subject in db.Subject
                     join Course in db.Course
                     on Subject.Courseidref equals Course.Courseid
                     where Course.IsActive == true
                     orderby Subject.Subjectid ascending
                     select new
                     {
                        Subject.Subjectid,
                        Subject.Sname,
                        Course.Coursename,
                        Subject.Courseidref,
                        Subject.IsActive
                     };
            
            if (result == null)
            {
                return new { data = "No Data Found" };
            }
            else
            {
                return result;

            }
        }


        [Route("GetSubjectByCourseId/{id}")]
        [HttpGet]
        public object GetSubjectByCourseId(int id)
        {
            var result = db.Subject.Where(c => c.Courseidref.Equals(id));

            if (result.Count() == 0)
            {
                return new ResponseClass{ Status=404,Message= "No Subject found to the corresponding course please add subject first",Response=null };
            }
            else
            {
                return new ResponseClass{ Status = 200,Message = "Subject found successfully",Response = result };

            }
        }




        [Route("AddSubject")]
        [HttpPost]
        public object AddSubject(Subject subject)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    var result = db.Subject.Where(c => c.Sname.Equals(subject.Sname) && c.Courseidref.Equals(subject.Courseidref));
                    if (result.Count() == 0)
                    {
                        db.Subject.Add(subject);
                        db.SaveChanges();
                        return new ResponseClass
                        {
                            Status = 200,
                            Message = "Data Inserted SuccessFully",
                            Response = null
                        };
                    }
                    else
                    {
                        return new ResponseClass
                        {
                            Status = 403,
                            Message = "Subject Name Alreay Exits",
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



        [Route("ActiveSubject")]
        [HttpPut]
        public object ActiveSubject(Subject subject)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var request = db.Subject.Where(c => c.Subjectid.Equals(subject.Subjectid));
                    if (request != null && subject.IsActive != null)
                    {
                        Subject data = new Subject
                        {
                            Subjectid = subject.Subjectid,
                            IsActive = subject.IsActive
                        };
                        db.Entry(data).Property("IsActive").IsModified = true;
                        db.SaveChanges();
                        return new ResponseClass
                        {
                            Status = 200,
                            Message = "Subject Updated SuccessFully",
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


        [Route("UpdateSubject")]
        [HttpPut]
        public object UpdateSubject(Subject subject)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    var result = db.Subject.Where(c => c.Subjectid.Equals(subject.Subjectid));
                    if (result.Count() != 0)
                    {
                        
                            db.Entry(subject).Property("Courseidref").IsModified = true;
                            db.Entry(subject).Property("Sname").IsModified = true;
                            db.SaveChanges();
                            return new ResponseClass
                            {
                                Status = 200,
                                Message = "Data Updated SuccessFully",
                                Response = null
                            };
                       
                    }
                    else
                    {
                        return new ResponseClass
                        {
                            Status = 404,
                            Message = "Subject not found for updation",
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
    }
}