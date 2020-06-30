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
    public class CourseController : ControllerBase
    {
        readonly MonikaContext db = new MonikaContext();
        [Route("GetCourse")]
        [HttpGet] 
        public object GetAllCourse()
        {
            var result = db.Course.ToList();
            if (result == null)
            {
                return new { data = "No Data Found" };
            }
            else
            {
                return result;
                
            }
        }
        
        
        [Route("AddCourse")]
        [HttpPost]
        public object AddCourse(Course course)
        {
            try
            {
                if (ModelState.IsValid)
                {

                    var result = db.Course.Where(c => c.Coursename.Equals(course.Coursename));
                    if (result.Count() == 0)
                    {
                        db.Course.Add(course);
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
                            Message = "Course Name Alreay Exits",
                            Response = null
                        };
                    }
                    
                }
                else
                {
                    return new ResponseClass { Status = 400, Message = "Data Not Valid", Response = null };
                }
            }
            catch(Exception e)
            {
                throw e;
            }
        }
        
        
        [Route("ActiveCourse")]
        [HttpPut]
        public object ActiveCourse(Course course)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var request = db.Course.Where(c => c.Courseid.Equals(course.Courseid));
                    if (request != null && course.IsActive != null)
                    {
                        Course data = new Course
                        {
                            Courseid = course.Courseid,
                            IsActive = course.IsActive
                        };
                        db.Entry(data).Property("IsActive").IsModified = true;
                        db.SaveChanges();
                        return new ResponseClass
                        {
                            Status = 200,
                            Message = "Course Updated SuccessFully",
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


        [Route("UpdateCourse")]
        [HttpPut]
        public object UpdateCourse(Course course)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var request = db.Course.Where(c => c.Courseid.Equals(course.Courseid));
                    if (request != null && course.Coursename != null)
                    {
                        Course data = new Course
                        {
                            Courseid = course.Courseid,
                            Coursename = course.Coursename
                        };
                        db.Entry(data).Property("Coursename").IsModified = true;
                        db.SaveChanges();
                        return new ResponseClass
                        {
                            Status = 200,
                            Message = "Course Updated SuccessFully",
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





        //public  HttpResponseMessage AddCourse(Course course)
        //{
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            db.Course.Add(course);
        //            db.SaveChanges();
        //            return
        //        }
        //        else
        //        {
        //            return new HttpResponseMessage
        //            {
        //                StatusCode = System.Net.HttpStatusCode.OK,

        //            };

        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}

    }
}