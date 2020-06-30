
        // {
        //     (() => {
        //         var course = new XMLHttpRequest();
        //         course.onreadystatechange = function () {
        //             if (this.readyState == 4 && this.status == 200) {
        //                 var response = JSON.parse(this.responseText);
        //                 response.map(function (item) {
        //                     // for Teacher Menu
        //                     var select = document.getElementById("stdCourse");
        //                     var option = document.createElement("option");
        //                     option.setAttribute("value", item.courseid);
        //                     option.setAttribute("class", "form-control");
        //                     option.innerHTML = item.coursename;
        //                     select.appendChild(option);
        //                 });
        //             }
        //         }
        //         course.open("GET", "https://localhost:44379/api/Course/GetCourse", true);
        //         course.setRequestHeader("Content-type", "application/json");
        //         course.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
        //         course.send();

        //     })()
        // }

        function checkLogin() {
            // if (localStorage.getItem("token") != null && localStorage.getItem("firstname") != null && localStorage.getItem("lastname")) {
            //     if(localStorage.getItem("role")==1){
            //         document.getElementById("login").innerHTML = '<div class="dropdown mr-5"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> '+localStorage.getItem("firstname")+' '+localStorage.getItem("lastname")+'</button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">   <a class="dropdown-item"  href="studentDashboard.html">Dashboard</a>  <a class="dropdown-item" href="#" id="logout">Logout</a>   </div ></div > ';
            //     }
            //     else if(localStorage.getItem("role")==2){
            //         document.getElementById("login").innerHTML = '<div class="dropdown mr-5"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> '+localStorage.getItem("firstname")+' '+localStorage.getItem("lastname")+'</button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">   <a class="dropdown-item"  href="teacherDashboard.html">Dashboard</a>    <a class="dropdown-item" href="#" id="logout">Logout</a>   </div ></div > ';
            //     }
            //     else if(localStorage.getItem("role")==3)
            //     {
            //         document.getElementById("login").innerHTML = '<div class="dropdown mr-5"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> '+localStorage.getItem("firstname")+' '+localStorage.getItem("lastname")+'</button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">   <a class="dropdown-item"  href="adminDashboard.html">Dashboard</a>   <a class="dropdown-item" href="#" id="logout">Logout</a>   </div ></div > ';
            //     }

            //     document.getElementById("logout").addEventListener("click", function () {
            //         localStorage.clear();
            //         location.reload();
            //     });
            // }
            if (atob(localStorage.getItem("role")) == 1) {
                window.location.href = "studentDashboard.html";
            }
            else if (atob(localStorage.getItem("role")) == 2) {
                window.location.href = "teacherDashboard.html";
            }
            else if (atob(localStorage.getItem("role")) == 3) {
                window.location.href = "adminDashboard.html";
            }
        }
        function loginForm(event) {
            event.preventDefault();
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    if (response.accessToken != null) {
                        localStorage.setItem("token", response.accessToken);
                        localStorage.setItem("id", response.regId);
                        localStorage.setItem("firstname", response.firstName);
                        localStorage.setItem("lastname", response.lastName);
                        localStorage.setItem("email", response.email);
                        localStorage.setItem("role", btoa(response.role));
                        location.reload();
                        if (parseInt(response.role) == 1) {
                            window.location.href = "studentDashboard.html";
                        }
                        else if (parseInt(response.role) == 2) {
                            window.location.href = "teacherDashboard.html";
                        }
                        else if (parseInt(response.role) == 3) {
                            window.location.href = "adminDashboard.html";
                        }

                    }
                    else if (response.message) {
                        var err = document.getElementById("loginError");
                        err.setAttribute("style", "display:block");
                        err.innerHTML = response.message;
                    }
                    
                    else {
                        alert("Server Down");
                    }
                }
            }
            const Credientals = {
                "email": event.target[0].value,
                "password": event.target[1].value
            }
            xhttp.open("POST", "https://localhost:44379/api/Registration/Login", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(Credientals));
        }


        function StudentRegistration(event) {
            event.preventDefault();
            var ele = document.getElementById("stdRegSuccess");
            var err = document.getElementById("stdRegError");
            if (event.target[3].value == event.target[4].value) {
                err.setAttribute("style", "display:none");
            var StudentRegistration = new XMLHttpRequest();
            StudentRegistration.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    if (response.status == 200) {
                        ele.setAttribute("style", "display:block");
                        ele.innerHTML = response.message;
                        document.getElementById("stdFirstname").value="";
                        document.getElementById("studLastname").value="";
                        document.getElementById("stdEmail").value="";
                        document.getElementById("stdPassword").value="";
                        document.getElementById("stdCnfpassword").value="";
                    }
                    else {
                        ele.setAttribute("style", "display:none");
                        err.setAttribute("style", "display:block");
                        err.innerHTML =response.message;
                    }
                }
            }
            const StudentRegistrationData = {
                registration: {
                    firstname: event.target[0].value,
                    lastName: event.target[1].value,
                    email: event.target[2].value,
                    password: event.target[4].value,
                    roleid: Number(1),
                    isActive: Boolean(true)
                },
                studentAssignCourse: {
                    stdcourseid: Number(event.target[3].value)
                }
            }
            StudentRegistration.open("POST", "https://localhost:44379/api/Registration/StudentRegistration", true);
            StudentRegistration.setRequestHeader("Content-type", "application/json");
            StudentRegistration.send(JSON.stringify(StudentRegistrationData));
        }
        else {
            err.setAttribute("style", "display:block");
            err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Password and Comfirm Password are not matching';
        }
        }

        function Registration(event) {
            event.preventDefault();
            var err = document.getElementById("regSuccess");
            var ele = document.getElementById("regError");
            if (event.target[3].value == event.target[4].value) {
                err.setAttribute("style", "display:none");
            var Registration = new XMLHttpRequest();
            Registration.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    if (response.status == 200) {
                        ele.setAttribute("style", "display:block");
                        ele.innerHTML =response.message;
                        document.getElementById("firstname").value="";
                        document.getElementById("lastname").value="";
                        document.getElementById("regEmail").value="";
                        document.getElementById("password").value="";
                        document.getElementById("cnfpassword").value="";
                    }
                    else {
                        ele.setAttribute("style", "display:none");
                        err.setAttribute("style", "display:block");
                        err.innerHTML = response.message;
                    }
                }
            }
            const RegistrationData = {
                firstname: event.target[0].value,
                lastName: event.target[1].value,
                email: event.target[2].value,
                password: event.target[3].value,
                roleid:Number(2),
                isActive: Boolean(false)

            }
            Registration.open("POST", "https://localhost:44379/api/Registration/Registration", true);
            Registration.setRequestHeader("Content-type", "application/json");
            Registration.send(JSON.stringify(RegistrationData));
        }
        else {
            err.setAttribute("style", "display:block");
            err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Password and Comfirm Password are not matching';
        }
        }