using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using JWTTokenAuthentication.Models;
using System.Net.Http;
using System.Net;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace JWTTokenAuthentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    public class RegistrationController : ControllerBase
    {
        readonly MonikaContext db = new MonikaContext();

        [AllowAnonymous]
        [Route("StudentRegistration")]
        [HttpPost]
        public object StudentRegistration(StudentRegistration stdReg)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var Check = db.Registration.Where(c => c.Email.Equals(stdReg.Registration.Email)).FirstOrDefault();
                    if (Check == null)
                    {
                        var result = db.Registration.Add(stdReg.Registration);
                        db.SaveChanges();
                        var request = db.Registration.Where(c => c.Email.Equals(stdReg.Registration.Email)).FirstOrDefault();
                        if (request != null)
                        {
                            StudentAssignCourse studentAssignCourse = new StudentAssignCourse
                            {
                                Regidref = request.Regid,
                                Stdcourseid = stdReg.StudentAssignCourse.Stdcourseid
                            };
                            db.StudentAssignCourse.Add(studentAssignCourse);
                            int response = db.SaveChanges();
                            if (response == 0)
                            {
                                return new ResponseClass
                                {
                                    Status = 400,
                                    Message = "Register Successfully but Courese not assign Contact Admin",
                                    Response = null
                                };
                            }
                            else
                            {
                                return new ResponseClass
                                {
                                    Status = 200,
                                    Message = "Register Successfully",
                                    Response = null
                                };
                            }
                        }
                        else
                        {
                            return new ResponseClass
                            {
                                Status = 400,
                                Message = "Please check you details",
                                Response = null
                            };
                        }
                    }
                    else
                    {
                        return new ResponseClass
                        {
                            Status = 403,
                            Message = "Email Already Exits",
                            Response = null
                        };

                    }

                }
                else
                {
                    return new ResponseClass
                    {
                        Status = 406,
                        Message = "Content Not valid please check you details",
                        Response = null
                    };
                }

            }
            catch (Exception e)
            {
                return e.Message;
            }
        }


        [AllowAnonymous]
        [Route("Registration")]
        [HttpPost]
        public object Registration(Registration Reg)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var Check = db.Registration.Where(c => c.Email.Equals(Reg.Email)).FirstOrDefault();
                    if (Check == null)
                    {
                        var result = db.Registration.Add(Reg);
                        int response = db.SaveChanges();
                        if (response == 0)
                        {
                            return new ResponseClass
                            {
                                Status = 400,
                                Message = "Please Check your details",
                                Response = null
                            };
                        }
                        else
                        {
                            return new ResponseClass
                            {
                                Status = 200,
                                Message = "Register Successfully",
                                Response = null
                            };
                        }
                    }
                    else
                    {
                        return new ResponseClass
                        {
                            Status = 403,
                            Message = "Email Already Exits",
                            Response = null
                        };

                    }

                }
                else
                {
                    return new ResponseClass
                    {
                        Status = 406,
                        Message = "Content Not valid please check you details",
                        Response = null
                    };
                }

            }
            catch (Exception e)
            {
                return e.Message;
            }
        }


        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public object Login(Registration reg)
        {
            var result = db.Registration.Where(c => c.Email.Equals(reg.Email) && c.Password.Equals(reg.Password)).FirstOrDefault();
            if (result != null)
            {
                if (result.IsActive == true)
                {
                    //if (result.Roleid == 2)
                    //{
                    string tokenString = GenerateJSONWebToken();
                    //    var request = from Registration in db.Registration
                    //                 from AssignSubject in db.AssignSubject
                    //                 from Course in db.Course
                    //                 where
                    //                   Registration.Roleid == 2 &&
                    //                   Registration.IsActive == true &&
                    //                   Course.Courseid ==
                    //                     ((from Subject0 in db.Subject
                    //                       where
                    //Subject0.Subjectid == AssignSubject.Subjectidref
                    //                       select new
                    //                       {
                    //                           Subject0.Courseidref
                    //                       }).First().Courseidref) &&
                    //                   AssignSubject.Regidref == Registration.Regid
                    //                 orderby
                    //                   AssignSubject.Assignid
                    //                 select new
                    //                 {
                    //                     AssignSubject.Assignid,
                    //                     Registration.Firstname,
                    //                     Registration.Lastname,
                    //                     Registration.Email,
                    //                     AssignSubject.SubjectidrefNavigation.Sname,
                    //                     Course.Coursename,
                    //                     Course.Courseid,
                    //                     AssignSubject.Subjectidref,
                    //                     AssignSubject.IsActive,
                    //                     accessToken=tokenString,
                    //                     Registration.Roleid
                    //                 };
                    //    return new ResponseClass { Status = 200, Message = "Login Successfully", Response = request };
                    //}
                    //else
                    //{

                    return new
                    {
                        regId = result.Regid,
                        firstName = result.Firstname,
                        lastName = result.Lastname,
                        role = result.Roleid,
                        email = result.Email,
                        accessToken = tokenString
                    };
                    //Registration registration = new Registration
                    //    {
                    //        Regid = result.Regid,
                    //        Firstname = result.Firstname,
                    //        Lastname = result.Lastname,
                    //        Roleid = result.Roleid,
                    //        Email = result.Email,

                    //    };
                    //    return new ResponseClass { Status = 200, Message = "login Successfuly", Response =null};

                }



                else
                {
                    return new ResponseClass { Status = -1, Message = "User is Not Active", Response = null };
                }
            }
            else
            {
                return new { message = "NotFound" };
            }

                
        }


        [Route("GetAssignTeacher")]
        [HttpGet]
        public object GetAssignTeacher()
        {
            var result = from Registration in db.Registration
                         from AssignSubject in db.AssignSubject
                         from Course in db.Course
                         where
                           Registration.Roleid == 2 &&
                           Registration.IsActive == true &&
                           Course.Courseid ==
                             ((from Subject0 in db.Subject
                               where
        Subject0.Subjectid == AssignSubject.Subjectidref
                               select new
                               {
                                   Subject0.Courseidref
                               }).First().Courseidref) &&
                           AssignSubject.Regidref == Registration.Regid
                         orderby
                           AssignSubject.Assignid
                         select new
                         {
                             AssignSubject.Assignid,
                             Registration.Firstname,
                             Registration.Lastname,
                             Registration.Email,
                             AssignSubject.SubjectidrefNavigation.Sname,
                             Course.Coursename,
                             Course.Courseid,
                             AssignSubject.Subjectidref,
                             AssignSubject.IsActive
                         };
            if (result == null)
            {
                return new ResponseClass { Status = 204, Message = "Content Not Found", Response = null };
            }
            else
            {
                return new ResponseClass { Status = 200, Message = "Successfully", Response = result };

            }
        }

        [Route("GetTeacher")]
        [HttpGet]
        public object GetAllTeacher()
        {
            var result = from Registration in db.Registration
                         where
                           Registration.Roleid == 2
                         select new
                         {
                             Registration.Regid,
                             Registration.Firstname,
                             Registration.Lastname,
                             Registration.Email,
                             Registration.Roleid,
                             Registration.IsActive
                         };
            if (result == null)
            {
                return new ResponseClass { Status = 204, Message = "Content Not Found", Response = null };
            }
            else
            {
                return new ResponseClass { Status = 200, Message = "Successfully", Response = result };

            }
        }

        [Route("GetStudentDetail")]
        [HttpGet]
        public object GetStudentDetail()
        {
            try
            {
                var response = from Registration in db.Registration
                               from Course in db.Course
                               from StudentAssignCourse in db.StudentAssignCourse
                               where
                                 Registration.Regid == StudentAssignCourse.Regidref &&
                                 Registration.Roleid == 1 &&
                                 Course.Courseid == StudentAssignCourse.Stdcourseid
                               orderby
                                 Registration.Regid
                               select new
                               {
                                   Registration.Regid,
                                   Registration.Firstname,
                                   Registration.Lastname,
                                   Registration.Email,
                                   Course.Coursename,
                                   Registration.IsActive
                               };
                return new ResponseClass { Status = Ok(),Message="Successfully",Response=response };
            }
            catch(Exception e)
            {
                return new ResponseClass { Status = BadRequest(), Message = e.Message, Response = null };
            }
            
        }

        [Route("GetStudentDetailById/{id}")]
        [HttpGet]
        public object GetStudentDetailById(int id)
        {
            try
            {
                var response = from Registration in db.Registration
                               from Course in db.Course
                               from StudentAssignCourse in db.StudentAssignCourse
                               where
                                 Registration.Regid == StudentAssignCourse.Regidref &&
                                 Registration.Roleid == 1 &&
                                 Course.Courseid == StudentAssignCourse.Stdcourseid &&
                                 Registration.Regid == id
                               select new
                               {
                                   Registration.Regid,
                                   Registration.Firstname,
                                   Registration.Lastname,
                                   Registration.Email,
                                   Course.Coursename,
                                   Registration.IsActive
                               };
                return new ResponseClass { Status = Ok(), Message = "Successfully", Response = response };
            }
            catch (Exception e)
            {
                return new ResponseClass { Status = BadRequest(), Message = e.Message, Response = null };
            }

        }


        [Route("UpdateIsActive")]
        [HttpPut]
        public object UpdateIsActive(Registration registration)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var request = db.Registration.Where(c => c.Regid.Equals(registration.Regid));
                    if (request != null && registration.IsActive != null)
                    {
                        Registration data = new Registration
                        {
                            Regid = registration.Regid,
                            IsActive = registration.IsActive
                        };
                        db.Entry(data).Property("IsActive").IsModified = true;
                        db.SaveChanges();
                        return new ResponseClass
                        {
                            Status = 200,
                            Message = "IsActive Updated SuccessFully",
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

        
        [Route("AddTeacher")]
        [HttpPost]
        public object AddTeacher(Registration registration)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var Check = db.Registration.Where(c => c.Email.Equals(registration.Email)).FirstOrDefault();
                    if (Check == null)
                    {
                        var result = db.Registration.Add(registration);
                            int response=db.SaveChanges();
                            if (response == 0)
                            {
                                return new ResponseClass
                                {
                                    Status = 400,
                                    Message = "Teacher Register",
                                    Response = null
                                };
                            }
                            else
                            {
                                return new ResponseClass
                                {
                                    Status = 200,
                                    Message = "Teacher Register Successfully",
                                    Response = null
                                };
                            }
                    }
                    else
                    {
                        return new ResponseClass
                        {
                            Status = 403,
                            Message = "Email Already Exits",
                            Response = null
                        };

                    }
                    
                }
                else
                {
                    return new ResponseClass
                    {
                        Status = 406,
                        Message = "Content Not valid please check you details",
                        Response = null
                    };
                }
            }
            catch(Exception e)
            {
                return e.Message;
            }

        }

        [Route("UpdateRegistration")]
        [HttpPut]
        public object UpdateRegistration(Registration registration)
        {
            try
            {
                if (ModelState.IsValid)
                {
                        db.Entry(registration).Property("Firstname").IsModified = true;
                        db.Entry(registration).Property("Lastname").IsModified = true;
                        db.SaveChanges();
                        return new ResponseClass { Status = 200, Message = "Name Updated Successfully", Response = null };
                }
                else
                {
                    return new ResponseClass { Status = 400, Message = "Data Not valid", Response = null };
                }
            }
            catch(Exception e)
            {
                return new ResponseClass { Status = 404, Message = e.Message, Response = null };
            }
        }

        private string GenerateJSONWebToken()
        {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("shivnath0001@gmail.com"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                 issuer: "https://localhost:44379",
                audience: "https://localhost:44379",
                expires: DateTime.Now.AddHours(3),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}