// IIFE
{
    (() => {

        if (atob(localStorage.getItem("role")) == 3) {
            document.getElementById("welcome").innerText = "Welcome " + localStorage.getItem("firstname") + " " + localStorage.getItem("lastname");
        }
        else if (atob(localStorage.getItem("role")) == 1) {
            location.href = "studentDashboard.html";
        } else if (atob(localStorage.getItem("role")) == 2) {
            location.href = "teacherDashboard.html";
        }
        else {
            localStorage.clear();
            location.href = "index.html";

        }

        // Course
        displayCourse();

        // Subject
        displaySubject();

        // Teacher
        displayTeacher();

        // Display Assgin Subject
        displayAssignSubject();

        // Display Student
        displayStudentDetail();

    })()
}



// Display Course
function displayCourse() {
    var course = new XMLHttpRequest();
    course.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            // Get Div
            let displayCourseTable = document.getElementById("courseTable");
            displayCourseTable.innerHTML = "";

            // Creating Table
            let courseTable = document.createElement("table");
            courseTable.setAttribute("class", "table table-hover");

            // Creating Thead
            let courseTableHeading = document.createElement("thead");

            // Creating Tr
            let courseTableRow = document.createElement("tr");

            // Creating Th
            let courseTableCell1 = document.createElement("th");
            courseTableCell1.innerHTML = "Course Id";

            let courseTableCell2 = document.createElement("th");
            courseTableCell2.innerHTML = "Course Name";

            let courseTableCell3 = document.createElement("th");
            courseTableCell3.innerHTML = "IsActive";

            let courseTableCell4 = document.createElement("th");
            courseTableCell4.innerHTML = "Edit";



            courseTableRow.appendChild(courseTableCell1);
            courseTableRow.appendChild(courseTableCell2);
            courseTableRow.appendChild(courseTableCell3);
            courseTableRow.appendChild(courseTableCell4);


            courseTableHeading.appendChild(courseTableRow);

            

            // Course Option for Add Subject
            var select1 = document.getElementById("courseMenu");
            select1.innerHTML = "";

            // Hidden Option for Add Subject
            let hiddenOption1 = document.createElement("option");
            hiddenOption1.setAttribute("hidden", "");
            hiddenOption1.innerHTML = "Select Course Name";
            select1.appendChild(hiddenOption1);

            // Course Option for Assign Subject to Teacher
            var select = document.getElementById("teacherCourseMenu");
            select.setAttribute("onchange", "getSubject(event)");
            select.innerHTML = "";

            // Hidden Option for Add Subject
            let hiddenOption = document.createElement("option");
            hiddenOption.setAttribute("hidden", "");
            hiddenOption.innerHTML = "Select Course Name";
            select.appendChild(hiddenOption);

            // Course Option for Add Student Detail
            var select2 = document.getElementById("studentCourseMenu");
            select2.innerHTML = "";

            // Hidden Option for Add Student Detail
            let hiddenOption2 = document.createElement("option");
            hiddenOption2.setAttribute("hidden", "");
            hiddenOption2.innerHTML = "Select Course Name";
            select2.appendChild(hiddenOption2);


            var courseTableBody = document.createElement("tbody");
            courseTableBody.setAttribute("id","searchCourseTable");

            response.map(function (item) {
                if (item.isActive == true) {
                    var tr = document.createElement('tr');
                }
                else {
                    var tr = document.createElement('tr');
                    tr.setAttribute("class", "bg-warning");
                    tr.setAttribute("title", "Course Is Not Active");
                }

                // Course Id
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(item.courseid));
                tr.appendChild(td);


                // Course Name
                var td1 = document.createElement('td');
                td1.appendChild(document.createTextNode(item.coursename));
                tr.appendChild(td1);

                // Course IsActive
                var td3 = document.createElement('td');

                let div = document.createElement("div")
                div.setAttribute("class", "custom-control custom-checkbox");

                let chkbox = document.createElement("input");
                chkbox.setAttribute("type", "checkbox")
                chkbox.setAttribute("class", "custom-control-input");
                chkbox.setAttribute("id", "course" + item.courseid);
                chkbox.setAttribute("value", item.courseid);
                chkbox.setAttribute("onchange", "toggleCourse(event)")

                let label = document.createElement("label");
                label.setAttribute("class", "custom-control-label");
                label.setAttribute("for", "course" + item.courseid);
                div.appendChild(chkbox);
                div.appendChild(label);
                if (item.isActive == true) {
                    // Course Option for Add Subject
                    var option1 = document.createElement("option");
                    option1.setAttribute("value", item.courseid);
                    option1.setAttribute("class", "form-control");
                    option1.innerHTML = item.coursename;
                    select1.appendChild(option1);

                    // Course Option for Assign Subject to Teacher
                    var option = document.createElement("option");
                    option.setAttribute("value", item.courseid);
                    option.setAttribute("class", "form-control");
                    option.innerHTML = item.coursename;
                    select.appendChild(option);

                    // Hidden Option for Add Student Detail
                    var option2 = document.createElement("option");
                    option2.setAttribute("value", item.courseid);
                    option2.setAttribute("class", "form-control");
                    option2.innerHTML = item.coursename;
                    select2.appendChild(option2);

                    chkbox.setAttribute("Checked", "true");
                    label.innerHTML = "Active";
                    td3.appendChild(div);
                }
                else {
                    label.innerHTML = "Not Active";
                    td3.appendChild(div);
                }
                div.appendChild(chkbox);
                div.appendChild(label);
                tr.appendChild(td3);

                // Course Edit Button
                var td4 = document.createElement('td');
                td4.innerHTML = '<button class="btn btn-primary mr-2" onclick="editCourseModal(event)" slot="' + item.coursename + '"   id="' + item.courseid + '" data-toggle="modal" data-target="#editCourseModel' + item.courseid + '"> <i class="fa fa-pencil"  aria-hidden="true" slot="' + item.coursename + '"   id="' + item.courseid + '"></i></button><button class="btn btn-danger"  onclick="deleteCourse(event)" value="sdbf"> <i class="fa fa-trash" aria-hidden="true" title="' + item.courseid + '"></i></button>';
                tr.appendChild(td4)

                courseTableBody.appendChild(tr);
            });

            courseTable.appendChild(courseTableHeading);
            courseTable.appendChild(courseTableBody);

            displayCourseTable.appendChild(courseTable);

        }
        else if (this.status == 401) {

            alert();
        }
    }
    course.open("GET", "https://localhost:44379/api/Course/GetCourse", true);
    course.setRequestHeader("Content-type", "application/json");
    course.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    course.send();
}

// Add Course
function addCourse(event) {
    event.preventDefault();
    var addCourse = new XMLHttpRequest();
    addCourse.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 200) {
                var ele = document.getElementById("addCourseSuccess");
                ele.setAttribute("style", "display:block");
                ele.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                document.getElementById("course").value="";
                displayCourse();
            }
            else {
                var err = document.getElementById("addCourseError");
                err.setAttribute("style", "display:block");
                err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
            }
        }
    }
    const CourseData = {
        coursename: event.target[0].value,
        isActive: Boolean(event.target[1].value)
    }
    addCourse.open("POST", "https://localhost:44379/api/Course/AddCourse", true);
    addCourse.setRequestHeader("Content-type", "application/json");
    addCourse.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    addCourse.send(JSON.stringify(CourseData));
}

// Edit Course Model
function editCourseModal(event) {
    let CourseId = event.target.id;
    let CourseName = event.target.slot;

    var editCourseModel = document.getElementById("editCourseModal");
    // Creating Model

    // Start Model
    var editModel = document.createElement("div");
    editModel.setAttribute("class", "modal fade");
    editModel.setAttribute("id", "editCourseModel" + CourseId);

    editModel.setAttribute("tabindex", "-1");
    editModel.setAttribute("role", "dialog");
    editModel.setAttribute("aria-labelledby", "EditCourseTitle")
    editModel.setAttribute("data-backdrop", "false");
    editModel.setAttribute("aria-hidden", "true");




    // Model Center
    var modelCenter = document.createElement("div");
    modelCenter.setAttribute("class", "modal-dialog modal-dialog-centered");
    modelCenter.setAttribute("role", "document");

    // Model Content
    var modelContent = document.createElement("div");
    modelContent.setAttribute("class", "modal-content");

    // Model Header
    var modelHeader = document.createElement("div");
    modelHeader.setAttribute("class", "modal-header");

    // Model Title
    var modelTitle = document.createElement("h5");
    modelTitle.setAttribute("class", "modal-title");
    modelTitle.setAttribute("id", "EditCourseTitle")
    modelTitle.innerHTML = "Edit Course Name";

    // Close Button
    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "close");
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("id", "close");

    // Close Icon
    var closeIcon = document.createElement("span");
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.innerHTML = "&times";

    closeButton.appendChild(closeIcon);

    modelHeader.appendChild(modelTitle);
    modelHeader.appendChild(closeButton);


    // Model body
    var modelBody = document.createElement("div");
    modelBody.setAttribute("class", "modal-body");

    // Success Notification Alert
    var successAlert = document.createElement("div");
    successAlert.setAttribute("class", "alert alert-success alert-dismissible fade show");
    successAlert.setAttribute("id", "editCourseSuccess");
    successAlert.setAttribute("style", "display: none;");


    // Error Notification Alert
    var errorAlert = document.createElement("div");
    errorAlert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
    errorAlert.setAttribute("id", "editCourseError");
    errorAlert.setAttribute("style", "display: none;");

    // Create Form
    var form = document.createElement("form");
    form.setAttribute("onsubmit", "editCourse(event)");

    // Form Group For Course Name
    var formGroupCourseName = document.createElement("div");
    formGroupCourseName.setAttribute("class", "form-group");

    // Course Id
    var hiddenCourseId = document.createElement("input");
    hiddenCourseId.setAttribute("type", "hidden");
    hiddenCourseId.setAttribute("value", CourseId);

    // CourseName Label
    var CourseNameLabel = document.createElement("label");
    CourseNameLabel.setAttribute("for", "editCourseName");
    CourseNameLabel.innerHTML = "Course Name";

    // CourseName Input
    var CourseNameInput = document.createElement("input");
    CourseNameInput.setAttribute("type", "text");
    CourseNameInput.setAttribute("class", "form-control");
    CourseNameInput.setAttribute("id", "editCourseName");
    CourseNameInput.setAttribute("placeholder", "Enter Course Name");
    CourseNameInput.setAttribute("value", CourseName);

    formGroupCourseName.appendChild(CourseNameLabel);
    formGroupCourseName.appendChild(CourseNameInput);




    //  Submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-primary btn-block");
    submitButton.innerHTML = "Edit Course";

    form.appendChild(hiddenCourseId);
    form.appendChild(formGroupCourseName);
    form.appendChild(submitButton);

    modelBody.appendChild(successAlert);
    modelBody.appendChild(errorAlert);
    modelBody.appendChild(form);

    modelContent.appendChild(modelHeader);
    modelContent.appendChild(modelBody);

    modelCenter.appendChild(modelContent);

    editModel.appendChild(modelCenter);
    editCourseModel.appendChild(editModel);
}

// Edit Course
function editCourse(event) {
    event.preventDefault();

    var ele = document.getElementById("editCourseSuccess");
    var err = document.getElementById("editCourseError");
    let editCourse = new XMLHttpRequest();
    editCourse.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.status == 200) {
                ele.setAttribute("style", "display:block");
                ele.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                displayCourse();
            }
            else {
                ele.setAttribute("style", "display:none");
                err.setAttribute("style", "display:block");
                err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
            }

        }
    }
    const editCourseData = {
        courseid: Number(event.target[0].value),
        coursename: event.target[1].value
    }
    editCourse.open("PUT", "https://localhost:44379/api/Course/UpdateCourse", true);
    editCourse.setRequestHeader("Content-Type", "application/json");
    editCourse.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    editCourse.send(JSON.stringify(editCourseData));
}

// Active or InActive Course
function toggleCourse(event) {
    event.preventDefault();
    var toggleActive = new XMLHttpRequest();
    toggleActive.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 200) {
                displayCourse();
                displaySubject();
            }
            else {
                alert("not")
            }
        }
    }
    const CourseData = {
        courseid: Number(event.target.value),
        isActive: Boolean(event.target.checked)
    }
    toggleActive.open("PUT", "https://localhost:44379/api/Course/ActiveCourse", true);
    toggleActive.setRequestHeader("Content-type", "application/json");
    toggleActive.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    toggleActive.send(JSON.stringify(CourseData));
}







// Display Subject
function displaySubject() {
    var subject = new XMLHttpRequest();
    subject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            // Get Div
            let displaySubjectTable = document.getElementById("subjectTable");
            displaySubjectTable.innerHTML = "";

            // Creating Table
            let subjectTable = document.createElement("table");
            subjectTable.setAttribute("class", "table table-hover");

            // Creating Thead
            let subjectTableHeading = document.createElement("thead");

            // Creating Tr
            let subjectTableRow = document.createElement("tr");

            // Creating Th
            let subjectTableCell1 = document.createElement("th");
            subjectTableCell1.innerHTML = "Subject Id";

            let subjectTableCell2 = document.createElement("th");
            subjectTableCell2.innerHTML = "Subject Name";

            let subjectTableCell3 = document.createElement("th");
            subjectTableCell3.innerHTML = "Course Name";

            let subjectTableCell4 = document.createElement("th");
            subjectTableCell4.innerHTML = "IsActive";

            let subjectTableCell5 = document.createElement("th");
            subjectTableCell5.innerHTML = "Edit";



            subjectTableRow.appendChild(subjectTableCell1);
            subjectTableRow.appendChild(subjectTableCell2);
            subjectTableRow.appendChild(subjectTableCell3);
            subjectTableRow.appendChild(subjectTableCell4);
            subjectTableRow.appendChild(subjectTableCell5);


            subjectTableHeading.appendChild(subjectTableRow);

            var subjectTableBody = document.createElement("tbody");
            subjectTableBody.setAttribute("id","searchSubjectTable");
            response.map(function (item) {
                if (item.isActive == true) {
                    var tr = document.createElement('tr');
                }
                else {
                    var tr = document.createElement('tr');
                    tr.setAttribute("class", "bg-warning");
                    tr.setAttribute("title", "Course Is Not Active");
                }
                // Subject Id
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(item.subjectid));
                tr.appendChild(td);

                // Subject Name
                var td1 = document.createElement('td');
                td1.appendChild(document.createTextNode(item.sname));
                tr.appendChild(td1);

                // Course Name
                var td2 = document.createElement('td');
                td2.appendChild(document.createTextNode(item.coursename));
                tr.appendChild(td2);

                // Subject IsActive
                let div = document.createElement("div")
                div.setAttribute("class", "custom-control custom-checkbox");

                let chkbox = document.createElement("input");
                chkbox.setAttribute("type", "checkbox")
                chkbox.setAttribute("class", "custom-control-input");
                chkbox.setAttribute("id", "subject" + item.subjectid);
                chkbox.setAttribute("value", item.subjectid);
                chkbox.setAttribute("onchange", "toggleSubject(event)")

                let label = document.createElement("label");
                label.setAttribute("class", "custom-control-label");
                label.setAttribute("for", "subject" + item.subjectid);
                div.appendChild(chkbox);
                div.appendChild(label);
                var td3 = document.createElement('td');
                if (item.isActive == 1) {
                    chkbox.setAttribute("Checked", "true");
                    label.innerHTML = "Active";
                    td3.appendChild(div);
                }
                else {
                    label.innerHTML = "Not Active"
                    td3.appendChild(div);
                }
                tr.appendChild(td3);

                // Subject Edit Button
                var td4 = document.createElement('td');
                td4.innerHTML = '<button class="btn btn-primary mr-2" onclick="editSubjectModal(event)" slot="' + item.sname + '"   id="' + item.subjectid + '" nonce="' + item.courseidref + '" data-toggle="modal" data-target="#editSubjectModel' + item.subjectid + '"> <i class="fa fa-pencil"  aria-hidden="true" slot="' + item.sname + '"    id="' + item.subjectid + '" nonce="' + item.coursename + '"></i></button><button class="btn btn-danger"> <i class="fa fa-trash" aria-hidden="true"></i></button>';
                tr.appendChild(td4)

                subjectTableBody.appendChild(tr);
            });
            subjectTable.appendChild(subjectTableHeading);
            subjectTable.appendChild(subjectTableBody);

            displaySubjectTable.appendChild(subjectTable);
        }
    }
    subject.open("GET", "https://localhost:44379/api/Subject/GetSubject", true);
    subject.setRequestHeader("Content-type", "application/json");
    subject.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    subject.send();
}

// Add Subject
function addSubject(event) {
    event.preventDefault();
    var addSubject = new XMLHttpRequest();
    addSubject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 200) {
                var ele = document.getElementById("addSubjectSuccess");
                ele.setAttribute("style", "display:block");
                ele.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                document.getElementById("subjectName").value="";
                displaySubject();
            }
            else {
                var err = document.getElementById("addSubjectError");
                err.setAttribute("style", "display:block");
                err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
            }
        }
    }
    const SubjectData = {
        courseidref: Number(event.target[0].value),
        sname: event.target[1].value,
        isActive: Boolean(event.target[2].value)
    }
    addSubject.open("POST", "https://localhost:44379/api/Subject/AddSubject", true);
    addSubject.setRequestHeader("Content-type", "application/json");
    addSubject.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    addSubject.send(JSON.stringify(SubjectData));
}

// Edit Subject Model
function editSubjectModal(event) {
    let SubjectId = event.target.id;
    let SubjectName = event.target.slot;
    let CourseId=event.target.nonce;


    var editSubjectModel = document.getElementById("editSubjectModal");
    // Creating Model

    // Start Model
    var editModel = document.createElement("div");
    editModel.setAttribute("class", "modal fade");
    editModel.setAttribute("id", "editSubjectModel" + SubjectId);

    editModel.setAttribute("tabindex", "-1");
    editModel.setAttribute("role", "dialog");
    editModel.setAttribute("aria-labelledby", "EditSubjectTitle")
    editModel.setAttribute("data-backdrop", "false");
    editModel.setAttribute("aria-hidden", "true");




    // Model Center
    var modelCenter = document.createElement("div");
    modelCenter.setAttribute("class", "modal-dialog modal-dialog-centered");
    modelCenter.setAttribute("role", "document");

    // Model Content
    var modelContent = document.createElement("div");
    modelContent.setAttribute("class", "modal-content");

    // Model Header
    var modelHeader = document.createElement("div");
    modelHeader.setAttribute("class", "modal-header");

    // Model Title
    var modelTitle = document.createElement("h5");
    modelTitle.setAttribute("class", "modal-title");
    modelTitle.setAttribute("id", "EditSubjectTitle")
    modelTitle.innerHTML = "Edit Subject Name";

    // Close Button
    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "close");
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("id", "close");

    // Close Icon
    var closeIcon = document.createElement("span");
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.innerHTML = "&times";

    closeButton.appendChild(closeIcon);

    modelHeader.appendChild(modelTitle);
    modelHeader.appendChild(closeButton);


    // Model body
    var modelBody = document.createElement("div");
    modelBody.setAttribute("class", "modal-body");

    // Success Notification Alert
    var successAlert = document.createElement("div");
    successAlert.setAttribute("class", "alert alert-success alert-dismissible fade show");
    successAlert.setAttribute("id", "editSubjectSuccess");
    successAlert.setAttribute("style", "display: none;");


    // Error Notification Alert
    var errorAlert = document.createElement("div");
    errorAlert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
    errorAlert.setAttribute("id", "editSubjectError");
    errorAlert.setAttribute("style", "display: none;");

    // Create Form
    var form = document.createElement("form");
    form.setAttribute("onsubmit", "editSubject(event)");

    // Form Group For Subject Name
    var formGroupSubjectOption = document.createElement("div");
    formGroupSubjectOption.setAttribute("class", "form-group");

    // Subject Id
    var hiddenSubjectId = document.createElement("input");
    hiddenSubjectId.setAttribute("type", "hidden");
    hiddenSubjectId.setAttribute("value", SubjectId);

    // Course Label
    var CourseNameLabel = document.createElement("label");
    CourseNameLabel.setAttribute("for", "editCourseName");
    CourseNameLabel.innerHTML = "Course Name";

    // Course Select
    var CourseSelect = document.createElement("select");
    CourseSelect.setAttribute("class","form-control");

    var course = new XMLHttpRequest();
    course.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            response.map(function (item) {
                if (item.isActive == true) 
                {
                    if(item.courseid==CourseId)
                    {
                        // Course Option for Assign Subject to Teacher
                        var selectedOption = document.createElement("Option");
                        selectedOption.setAttribute("value", item.courseid);
                        selectedOption.setAttribute("selected","");
                        selectedOption.setAttribute("class", "form-control");
                        selectedOption.innerHTML = item.coursename;
                        CourseSelect.appendChild(selectedOption);

                    }
                    else{ 
                        // Course Option for Assign Subject to Teacher
                        var option = document.createElement("option");
                        option.setAttribute("value", item.courseid);
                        option.setAttribute("class", "form-control");
                        option.innerHTML = item.coursename;
                        CourseSelect.appendChild(option);

                    }
                   
                }
            });
        }
    }
    course.open("GET", "https://localhost:44379/api/Course/GetCourse", true);
    course.setRequestHeader("Content-type", "application/json");
    course.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    course.send();



    // Form Group For Subject Name
    var formGroupSubjectName = document.createElement("div");
    formGroupSubjectName.setAttribute("class", "form-group");

    // SubjectName Label
    var SubjectNameLabel = document.createElement("label");
    SubjectNameLabel.setAttribute("for", "editSubjectName");
    SubjectNameLabel.innerHTML = "Subject Name";

    // SubjectName Input
    var SubjectNameInput = document.createElement("input");
    SubjectNameInput.setAttribute("type", "text");
    SubjectNameInput.setAttribute("class", "form-control");
    SubjectNameInput.setAttribute("id", "editSubjectName");
    SubjectNameInput.setAttribute("placeholder", "Enter Subject Name");
    SubjectNameInput.setAttribute("value", SubjectName);

    formGroupSubjectOption.appendChild(CourseNameLabel);
    formGroupSubjectOption.appendChild(CourseSelect);
    formGroupSubjectName.appendChild(SubjectNameLabel);
    formGroupSubjectName.appendChild(SubjectNameInput);




    //  Submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-primary btn-block");
    submitButton.innerHTML = "Edit Subject";

    form.appendChild(hiddenSubjectId);
    form.appendChild(formGroupSubjectOption);
    form.appendChild(formGroupSubjectName);
    form.appendChild(submitButton);

    modelBody.appendChild(successAlert);
    modelBody.appendChild(errorAlert);
    modelBody.appendChild(form);

    modelContent.appendChild(modelHeader);
    modelContent.appendChild(modelBody);

    modelCenter.appendChild(modelContent);

    editModel.appendChild(modelCenter);
    editSubjectModel.appendChild(editModel);
}

// Edit Subject
function editSubject(event) {
    event.preventDefault();
    // console.log(event.target);
    var ele = document.getElementById("editSubjectSuccess");
    var err = document.getElementById("editSubjectError");
    let editSubject = new XMLHttpRequest();
    editSubject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.status == 200) {
                ele.setAttribute("style", "display:block");
                ele.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                displaySubject();
            }
            else {
                ele.setAttribute("style", "display:none");
                err.setAttribute("style", "display:block");
                err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
            }

        }
    }
    const editSubjectData = {
        Subjectid: Number(event.target[0].value),
        courseidref:Number(event.target[1].value),
        sname: event.target[2].value
    }
    editSubject.open("PUT", "https://localhost:44379/api/Subject/UpdateSubject", true);
    editSubject.setRequestHeader("Content-Type", "application/json");
    editSubject.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
     editSubject.send(JSON.stringify(editSubjectData));
}

// Active or InActive Subject
function toggleSubject(event) {
    event.preventDefault();
    var toggleActive = new XMLHttpRequest();
    toggleActive.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 200) {
                displaySubject();

            }
            else {
                alert("not")
            }
        }
    }
    const SubjectData = {
        Subjectid: Number(event.target.value),
        isActive: Boolean(event.target.checked)
    }
    toggleActive.open("PUT", "https://localhost:44379/api/Subject/ActiveSubject", true);
    toggleActive.setRequestHeader("Content-type", "application/json");
    toggleActive.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    toggleActive.send(JSON.stringify(SubjectData));
}

// Get Subject
function getSubject(event) {
    event.preventDefault();
    var getSubject = new XMLHttpRequest();
    getSubject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            // for Teacher Subject Menu
            var select = document.getElementById("teacherSubjectMenu");
            select.innerHTML = "";
            let hiddenOption = document.createElement("Option");
            hiddenOption.setAttribute("hidden", "");
            hiddenOption.innerHTML = "Select Subject Name";
            select.appendChild(hiddenOption);

            // for Asign Subject
            var assignSubject=document.getElementById("assignSubject");
            assignSubject.innerHTML = "";
            let hiddenOption1 = document.createElement("option");
            hiddenOption1.setAttribute("hidden", "");
            hiddenOption1.innerHTML = "Select Subject Name";
            assignSubject.appendChild(hiddenOption1);

           
            if (response.status == 200) {
                response.response.map(function (item) {

                    if(item.isActive==1)
                    {
                        // for Teacher Subject Menu
                        var option = document.createElement("option");
                        option.setAttribute("value", item.subjectid);
                        option.setAttribute("class", "form-control");
                        option.innerHTML = item.sname;
                        select.appendChild(option);

                        // for Assign Subject
                        var option1 = document.createElement("option");
                        option1.setAttribute("value", item.subjectid);
                        option1.setAttribute("class", "form-control");
                        option1.innerHTML = item.sname;
                        assignSubject.appendChild(option1);

                    }
                    
                });
            }
            else {
                var option = document.createElement("option");
                option.setAttribute("class", "form-control");
                option.innerHTML = response.message;
                select.appendChild(option);
            }
        }
    }

    getSubject.open("GET", "https://localhost:44379/api/Subject/GetSubjectByCourseId/" + Number(event.target.value), true);
    getSubject.setRequestHeader("Content-type", "application/json");
    getSubject.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    getSubject.send();
}





// Display Teacher
function displayTeacher() {
    var teacher = new XMLHttpRequest();
    teacher.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            // Get Div
            let displayTeacherTable = document.getElementById("teacherTable");
            displayTeacherTable.innerHTML = "";

            // Creating Table
            let teacherTable = document.createElement("table");
            teacherTable.setAttribute("class", "table table-hover");

            // Creating Thead
            let teacherTableHeading = document.createElement("thead");

            // Creating Tr
            let teacherTableRow = document.createElement("tr");

            // Creating Th
            let teacherTableCell1 = document.createElement("th");
            teacherTableCell1.innerHTML = "Teacher Id";

            let teacherTableCell2 = document.createElement("th");
            teacherTableCell2.innerHTML = "FirstName";

            let teacherTableCell3 = document.createElement("th");
            teacherTableCell3.innerHTML = "LastName";

            let teacherTableCell4 = document.createElement("th");
            teacherTableCell4.innerHTML = "Email";

            let teacherTableCell5 = document.createElement("th");
            teacherTableCell5.innerHTML = "IsActive";

            let teacherTableCell6 = document.createElement("th");
            teacherTableCell6.innerHTML = "Edit";



            teacherTableRow.appendChild(teacherTableCell1);
            teacherTableRow.appendChild(teacherTableCell2);
            teacherTableRow.appendChild(teacherTableCell3);
            teacherTableRow.appendChild(teacherTableCell4);
            teacherTableRow.appendChild(teacherTableCell5);
            teacherTableRow.appendChild(teacherTableCell6);


            teacherTableHeading.appendChild(teacherTableRow);

       

            // Teacher Option for Assign Subject to Teacher
            var select = document.getElementById("teacherMenu");
            select.innerHTML = "";

            // Hidden Option for Add Subject
            let hiddenOption = document.createElement("option");
            hiddenOption.setAttribute("hidden", "");
            hiddenOption.innerHTML = "Select Teacher";
            select.appendChild(hiddenOption);

            // Teacher Table Body
            var teacherTableBody = document.createElement("tbody");
            teacherTableBody.setAttribute("id","searchTeacherTable");

            response.response.map(function (item) {
                if (item.isActive == true) {
                    var tr = document.createElement('tr');
                }
                else {
                    var tr = document.createElement('tr');
                    tr.setAttribute("class", "bg-warning");
                    tr.setAttribute("title", "Course Is Not Active");
                }




                //Teacher Registration Id
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(item.regid));
                tr.appendChild(td);

                // Teacher First Name
                var td1 = document.createElement('td');
                td1.appendChild(document.createTextNode(item.firstname));
                tr.appendChild(td1);

                // Teacher Last Name
                var td2 = document.createElement('td');
                td2.appendChild(document.createTextNode(item.lastname));
                tr.appendChild(td2);



                // Teacher Email
                var td3 = document.createElement('td');
                td3.appendChild(document.createTextNode(item.email));
                tr.appendChild(td3);






                // Teacher IsActive
                let div = document.createElement("div")
                div.setAttribute("class", "custom-control custom-checkbox");

                let chkbox = document.createElement("input");
                chkbox.setAttribute("type", "checkbox")
                chkbox.setAttribute("class", "custom-control-input");
                chkbox.setAttribute("id", "teacher" + item.regid);
                chkbox.setAttribute("value", item.regid);
                chkbox.setAttribute("onchange", "toggleTeacher(event)")

                let label = document.createElement("label");
                label.setAttribute("class", "custom-control-label");
                label.setAttribute("for", "teacher" + item.regid);
                div.appendChild(chkbox);
                div.appendChild(label);
                var td4 = document.createElement('td');
                if (item.isActive == 1) {
                    // Teacher Option for Assign Subject to Teacher
                    var option = document.createElement("option");
                    option.setAttribute("value", item.regid);
                    option.setAttribute("class", "form-control");
                    option.innerHTML = item.firstname + " " + item.lastname + " ( " + item.email + " )";
                    select.appendChild(option);

                    chkbox.setAttribute("Checked", "true");
                    label.innerHTML = "Active";
                    td4.appendChild(div);
                }
                else {
                    label.innerHTML = "Not Active";
                    td4.appendChild(div);
                }
                tr.appendChild(td4);

                // Teacher Edit Button
                var td5 = document.createElement('td');
                td5.innerHTML = '<button class="btn btn-primary mr-1" onclick="editTeacherModel(event)" slot="' + item.firstname + '" nonce="' + item.lastname + '"  id="' + item.regid + '" data-toggle="modal" data-target="#editModel' + item.regid + '" > <i class="fa fa-pencil"  aria-hidden="true"  slot="' + item.firstname + '" nonce="' + item.lastname + '"  id="' + item.regid + '"></i></button> <button class="btn btn-danger"> <i class="fa fa-trash" aria-hidden="true"></i></button>';
                tr.appendChild(td5)

                teacherTableBody.appendChild(tr);
            });
            teacherTable.appendChild(teacherTableHeading);
            teacherTable.appendChild(teacherTableBody);

            displayTeacherTable.appendChild(teacherTable);
        }
    }
    teacher.open("GET", "https://localhost:44379/api/Registration/GetTeacher", true);
    teacher.setRequestHeader("Content-type", "application/json");
    teacher.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    teacher.send();
}

// Edit Teacher Model
function editTeacherModel(event) {
    let RegId = event.target.id;
    let FirstName = event.target.slot;
    let LastName = event.target.nonce;

    var editTeacherModel = document.getElementById("editTeacherModal");
    // Creating Model

    // Start Model
    var editModel = document.createElement("div");
    editModel.setAttribute("class", "modal fade");
    editModel.setAttribute("id", "editModel" + RegId);

    editModel.setAttribute("tabindex", "-1");
    editModel.setAttribute("role", "dialog");
    editModel.setAttribute("aria-labelledby", "EditTeacherTitle")
    editModel.setAttribute("data-backdrop", "false");
    editModel.setAttribute("aria-hidden", "true");




    // Model Center
    var modelCenter = document.createElement("div");
    modelCenter.setAttribute("class", "modal-dialog modal-dialog-centered");
    modelCenter.setAttribute("role", "document");

    // Model Content
    var modelContent = document.createElement("div");
    modelContent.setAttribute("class", "modal-content");

    // Model Header
    var modelHeader = document.createElement("div");
    modelHeader.setAttribute("class", "modal-header");

    // Model Title
    var modelTitle = document.createElement("h5");
    modelTitle.setAttribute("class", "modal-title");
    modelTitle.setAttribute("id", "EditTeacherTitle")
    modelTitle.innerHTML = "Edit Teacher Detail";

    // Close Button
    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "close");
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("id", "close");

    // Close Icon
    var closeIcon = document.createElement("span");
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.innerHTML = "&times";

    closeButton.appendChild(closeIcon);

    modelHeader.appendChild(modelTitle);
    modelHeader.appendChild(closeButton);


    // Model body
    var modelBody = document.createElement("div");
    modelBody.setAttribute("class", "modal-body");

    // Success Notification Alert
    var successAlert = document.createElement("div");
    successAlert.setAttribute("class", "alert alert-success alert-dismissible fade show");
    successAlert.setAttribute("id", "editTeacherSuccess");
    successAlert.setAttribute("style", "display: none;");


    // Error Notification Alert
    var errorAlert = document.createElement("div");
    errorAlert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
    errorAlert.setAttribute("id", "editTeacherError");
    errorAlert.setAttribute("style", "display: none;");

    // Create Form
    var form = document.createElement("form");
    form.setAttribute("onsubmit", "editTeacher(event)");

    // // Row
    // var row=document.createElement("div");
    // row.setAttribute("class","row");

    //     // Column
    //     var col=document.createElement("col");
    //     col.setAttribute("class","col");

    // Form Group For FirstName
    var formGroupFirstName = document.createElement("div");
    formGroupFirstName.setAttribute("class", "form-group");

    // Registration Id
    var registrationId = document.createElement("input");
    registrationId.setAttribute("type", "hidden");
    registrationId.setAttribute("value", RegId);

    // FirstName Label
    var firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "editFirstName");
    firstNameLabel.innerHTML = "First Name";

    // FirstName Input
    var firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("type", "text");
    firstNameInput.setAttribute("class", "form-control");
    firstNameInput.setAttribute("id", "editFirstName");
    firstNameInput.setAttribute("placeholder", "Enter First Name");
    firstNameInput.setAttribute("value", FirstName);

    formGroupFirstName.appendChild(firstNameLabel);
    formGroupFirstName.appendChild(firstNameInput);


    // Form Group For LastName
    var formGroupLastName = document.createElement("div");
    formGroupLastName.setAttribute("class", "form-group");


    // LastName Label
    var lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "editLastName");
    lastNameLabel.innerHTML = "Last Name";

    // lastName Input
    var lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("type", "text");
    lastNameInput.setAttribute("class", "form-control");
    lastNameInput.setAttribute("id", "editLastName");
    lastNameInput.setAttribute("placeholder", "Enter Last Name");
    lastNameInput.setAttribute("value", LastName);

    formGroupLastName.appendChild(lastNameLabel);
    formGroupLastName.appendChild(lastNameInput);

    //  Submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-primary btn-block");
    submitButton.innerHTML = "Edit Teacher";

    form.appendChild(registrationId);
    form.appendChild(formGroupFirstName);
    form.appendChild(formGroupLastName);
    form.appendChild(submitButton);

    modelBody.appendChild(successAlert);
    modelBody.appendChild(errorAlert);
    modelBody.appendChild(form);

    modelContent.appendChild(modelHeader);
    modelContent.appendChild(modelBody);

    modelCenter.appendChild(modelContent);

    editModel.appendChild(modelCenter);
    editTeacherModel.appendChild(editModel);
}

// Edit Teacher
function editTeacher(event) {
    event.preventDefault();
    let editTeacher = new XMLHttpRequest();
    editTeacher.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.status == 200) {
                var ele = document.getElementById("editTeacherSuccess");
                ele.setAttribute("style", "display:block");
                ele.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                displayTeacher();
            }
            else {
                var err = document.getElementById("editTeacherError");
                err.setAttribute("style", "display:block");
                err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
            }

        }
    }
    const editTeacherData = {
        regid: Number(event.target[0].value),
        firstname: event.target[1].value,
        lastname: event.target[2].value
    }
    // console.log(editTeacherData);
    editTeacher.open("PUT", "https://localhost:44379/api/Registration/UpdateRegistration", true);
    editTeacher.setRequestHeader("Content-Type", "application/json");
    editTeacher.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    editTeacher.send(JSON.stringify(editTeacherData));
}

// Add Teacher
function addTeacher(event) {
    event.preventDefault();
    var err = document.getElementById("addTeacherError");
    var ele = document.getElementById("addTeacherSuccess");

    if (event.target[3].value == event.target[4].value) {
        err.setAttribute("style", "display:none");
        var addTeacher = new XMLHttpRequest();
        addTeacher.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                if (response.status == 200) {
                    ele.setAttribute("style", "display:block");
                    ele.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                    document.getElementById("firstname").value="";
                    document.getElementById("lastname").value="";
                    document.getElementById("teacherEmail").value="";
                    document.getElementById("teacherPassword").value="";
                    document.getElementById("teacherCnfPassword").value="";
                    displayTeacher();
                }
                else {
                    ele.setAttribute("style", "display:none");
                    err.setAttribute("style", "display:block");
                    err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                }
            }
        }
        const TeacherData = {
            firstname: event.target[0].value,
            lastname: event.target[1].value,
            email: event.target[2].value,
            password: event.target[3].value,
            roleid: Number(2),
            isActive: Boolean(event.target[4].value)
        }
        addTeacher.open("POST", "https://localhost:44379/api/Registration/AddTeacher", true);
        addTeacher.setRequestHeader("Content-type", "application/json");
        addTeacher.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
        addTeacher.send(JSON.stringify(TeacherData));
    }
    else {
        err.setAttribute("style", "display:block");
        err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Password and Comfirm Password are not matching';
    }

}

// Active or InActive Teacher
function toggleTeacher(event) {
    event.preventDefault();
    var toggleActive = new XMLHttpRequest();
    toggleActive.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 200) {
                displayTeacher();
                displayAssignSubject();

            }
            else {
                alert("not")
            }
        }
    }
    const TeacherData = {
        regid: Number(event.target.value),
        isActive: Boolean(event.target.checked)
    }
    toggleActive.open("PUT", "https://localhost:44379/api/Registration/UpdateIsActive", true);
    toggleActive.setRequestHeader("Content-type", "application/json");
    toggleActive.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    toggleActive.send(JSON.stringify(TeacherData));
}






// Display Assign Subject
function displayAssignSubject() {
    var assignSubject = new XMLHttpRequest();
    assignSubject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            // Get Div
            let displayAssignTable = document.getElementById("assignTable");
            displayAssignTable.innerHTML = "";

            // Creating Table
            let assignTable = document.createElement("table");
            assignTable.setAttribute("class", "table table-hover");

            // Creating Thead
            let assignTableHeading = document.createElement("thead");

            // Creating Tr
            let assignTableRow = document.createElement("tr");

            // Creating Th
            let assignTableCell1 = document.createElement("th");
            assignTableCell1.innerHTML = "Assign Id";

            let assignTableCell2 = document.createElement("th");
            assignTableCell2.innerHTML = "Name";

            let assignTableCell3 = document.createElement("th");
            assignTableCell3.innerHTML = "Subject";

            let assignTableCell4 = document.createElement("th");
            assignTableCell4.innerHTML = "Course";

            let assignTableCell5 = document.createElement("th");
            assignTableCell5.innerHTML = "IsActive";

            let assignTableCell6 = document.createElement("th");
            assignTableCell6.innerHTML = "Edit";



            assignTableRow.appendChild(assignTableCell1);
            assignTableRow.appendChild(assignTableCell2);
            assignTableRow.appendChild(assignTableCell3);
            assignTableRow.appendChild(assignTableCell4);
            assignTableRow.appendChild(assignTableCell5);
            assignTableRow.appendChild(assignTableCell6);


            assignTableHeading.appendChild(assignTableRow);

            // Assign Table Body
            var assignTableBody = document.createElement("tbody");
            assignTableBody.setAttribute("id","searchAssignSubjectTeacherTable");

            response.response.map(function (item) {
                if (item.isActive == true) {
                    var tr = document.createElement('tr');
                }
                else {
                    var tr = document.createElement('tr');
                    tr.setAttribute("class", "bg-warning");
                    tr.setAttribute("title", "Course Is Not Active");
                }

                //assignSubject Registration Id
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(item.assignid));
                tr.appendChild(td);

                // assignSubject First Name
                var td1 = document.createElement('td');
                td1.appendChild(document.createTextNode(item.firstname + " " + item.lastname + " ( " + item.email + " ) "));
                tr.appendChild(td1);

                // assignSubject Subject Name
                var td2 = document.createElement('td');
                td2.appendChild(document.createTextNode(item.sname));
                tr.appendChild(td2);

                // assignSubject Course Name
                var td3 = document.createElement('td');
                td3.appendChild(document.createTextNode(item.coursename));
                tr.appendChild(td3);

                // assignSubject IsActive
                let div = document.createElement("div")
                div.setAttribute("class", "custom-control custom-checkbox");

                let chkbox = document.createElement("input");
                chkbox.setAttribute("type", "checkbox")
                chkbox.setAttribute("class", "custom-control-input");
                chkbox.setAttribute("id", "assignSubject" + item.assignid);
                chkbox.setAttribute("value", item.assignid);
                chkbox.setAttribute("onchange", "toggleAssignSubject(event)")

                let label = document.createElement("label");
                label.setAttribute("class", "custom-control-label");
                label.setAttribute("for", "assignSubject" + item.assignid);
                div.appendChild(chkbox);
                div.appendChild(label);
                var td4 = document.createElement('td');
                if (item.isActive == 1) {
                    chkbox.setAttribute("Checked", "true");
                    label.innerHTML = "Active";
                    td4.appendChild(div);
                }
                else {
                    label.innerHTML = "Not Active";
                    td4.appendChild(div);
                }
                tr.appendChild(td4);

                // assignSubject Edit Button
                var td5 = document.createElement('td');
                td5.innerHTML = '<button class="btn btn-primary mr-2" onclick="editAssignSubjectModal(event)" slot="' + item.subjectidref + '" nonce="' + item.courseid + '"  id="' + item.assignid + '" lang="' + item.sname + '" data-toggle="modal" data-target="#editAssignSubject' + item.assignid + '" > <i class="fa fa-pencil"  aria-hidden="true"  slot="' + item.subjectidref + '" nonce="' + item.courseid + '"  id="' + item.assignid + '" lang="' + item.sname + '"></i></button><button class="btn btn-danger"  onclick="deleteCourse(event)" value="sdbf"> <i class="fa fa-trash" aria-hidden="true" title="' + item.courseid + '"></i></button>';
                tr.appendChild(td5)

                assignTableBody.appendChild(tr);
            });
            assignTable.appendChild(assignTableHeading);
            assignTable.appendChild(assignTableBody);

            displayAssignTable.appendChild(assignTable);
        }
    }
    assignSubject.open("GET", "https://localhost:44379/api/Registration/GetAssignTeacher", true);
    assignSubject.setRequestHeader("Content-type", "application/json");
    assignSubject.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    assignSubject.send();
}

// Active or InActive Assign Subject
function toggleAssignSubject(event) {
    event.preventDefault();
    var toggleAssignSubject = new XMLHttpRequest();
    toggleAssignSubject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 200) {
                displayAssignSubject();

            }
            else {
                alert("not")
            }
        }
    }
    const AssignSubjectData = {
        assignid: Number(event.target.value),
        isActive: Boolean(event.target.checked)
    }
    toggleAssignSubject.open("PUT", "https://localhost:44379/api/AssignSubject/ActiveAssignSubject", true);
    toggleAssignSubject.setRequestHeader("Content-type", "application/json");
    toggleAssignSubject.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    toggleAssignSubject.send(JSON.stringify(AssignSubjectData));
}

// Add Assign Subject
function assignSubject(event) {
    event.preventDefault();
    let assignSubject = new XMLHttpRequest();
    assignSubject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.status == 200) {
                var ele = document.getElementById("addAssignTeacherSuccess");
                ele.setAttribute("style", "display:block");
                ele.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                displayAssignSubject();
            }
            else {
                var err = document.getElementById("addAssignTeacherError");
                err.setAttribute("style", "display:block");
                err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
            }

        }
    }
    const AssignSubjectData = {
        Regidref: Number(event.target[0].value),
        Subjectidref: Number(event.target[2].value),
        isActive: Boolean(event.target[3].value)
    }
    assignSubject.open("POST", "https://localhost:44379/api/AssignSubject/AssignSubject", true);
    assignSubject.setRequestHeader("Content-Type", "application/json");
    assignSubject.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    assignSubject.send(JSON.stringify(AssignSubjectData));

}

// Edit Subject Model
function editAssignSubjectModal(event) {
    let AssignId = event.target.id;
    let AssignSubjectId = event.target.slot;
    let CourseId=event.target.nonce;
    let AssignSubjectName=event.target.lang;



    var editAssignSubjectModel = document.getElementById("editAssignSubjectModal");
    // Creating Model

    // Start Model
    var editModel = document.createElement("div");
    editModel.setAttribute("class", "modal fade");
    editModel.setAttribute("id", "editAssignSubject" + AssignId);

    editModel.setAttribute("tabindex", "-1");
    editModel.setAttribute("role", "dialog");
    editModel.setAttribute("aria-labelledby", "EditAssignSubjectTitle")
    editModel.setAttribute("data-backdrop", "false");
    editModel.setAttribute("aria-hidden", "true");




    // Model Center
    var modelCenter = document.createElement("div");
    modelCenter.setAttribute("class", "modal-dialog modal-dialog-centered");
    modelCenter.setAttribute("role", "document");

    // Model Content
    var modelContent = document.createElement("div");
    modelContent.setAttribute("class", "modal-content");

    // Model Header
    var modelHeader = document.createElement("div");
    modelHeader.setAttribute("class", "modal-header");

    // Model Title
    var modelTitle = document.createElement("h5");
    modelTitle.setAttribute("class", "modal-title");
    modelTitle.setAttribute("id", "EditAssignSubjectTitle")
    modelTitle.innerHTML = "Edit AssignSubject Name";

    // Close Button
    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "close");
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("id", "close");

    // Close Icon
    var closeIcon = document.createElement("span");
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.innerHTML = "&times";

    closeButton.appendChild(closeIcon);

    modelHeader.appendChild(modelTitle);
    modelHeader.appendChild(closeButton);


    // Model body
    var modelBody = document.createElement("div");
    modelBody.setAttribute("class", "modal-body");

    // Success Notification Alert
    var successAlert = document.createElement("div");
    successAlert.setAttribute("class", "alert alert-success alert-dismissible fade show");
    successAlert.setAttribute("id", "editAssignSubjectSuccess");
    successAlert.setAttribute("style", "display: none;");


    // Error Notification Alert
    var errorAlert = document.createElement("div");
    errorAlert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
    errorAlert.setAttribute("id", "editAssignSubjectError");
    errorAlert.setAttribute("style", "display: none;");

    // Create Form
    var form = document.createElement("form");
    form.setAttribute("onsubmit", "editAssignSubject(event)");

    // Form Group For AssignSubject Name
    var formGroupAssignSubjectOption = document.createElement("div");
    formGroupAssignSubjectOption.setAttribute("class", "form-group");

    // Assign Id
    var hiddenAssignSubjectId = document.createElement("input");
    hiddenAssignSubjectId.setAttribute("type", "hidden");
    hiddenAssignSubjectId.setAttribute("value", AssignId);

    // Course Label
    var CourseNameLabel = document.createElement("label");
    CourseNameLabel.setAttribute("for", "editCourseName");
    CourseNameLabel.innerHTML = "Course Name";

    // Course Select
    var CourseSelect = document.createElement("select");
    CourseSelect.setAttribute("class","form-control");
    CourseSelect.setAttribute("onchange","getSubject(event)");

    var course = new XMLHttpRequest();
    course.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            response.map(function (item) {
                if (item.isActive == true) 
                {
                    if(item.courseid==CourseId)
                    {
                        // Course Option for Assign AssignSubject to Teacher
                        var selectedOption = document.createElement("Option");
                        selectedOption.setAttribute("value", item.courseid);
                        selectedOption.setAttribute("selected","");
                        selectedOption.setAttribute("class", "form-control");
                        selectedOption.innerHTML = item.coursename;
                        CourseSelect.appendChild(selectedOption);

                    }
                    else{ 
                        // Course Option for Assign AssignSubject to Teacher
                        var option = document.createElement("option");
                        option.setAttribute("value", item.courseid);
                        option.setAttribute("class", "form-control");
                        option.innerHTML = item.coursename;
                        CourseSelect.appendChild(option);

                    }
                   
                }
            });
        }
    }
    course.open("GET", "https://localhost:44379/api/Course/GetCourse", true);
    course.setRequestHeader("Content-type", "application/json");
    course.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    course.send();



    // Form Group For AssignSubject Name
    var formGroupAssignSubjectName = document.createElement("div");
    formGroupAssignSubjectName.setAttribute("class", "form-group");

    // AssignSubjectName Label
    var AssignSubjectNameLabel = document.createElement("label");
    AssignSubjectNameLabel.setAttribute("for", "editAssignSubjectName");
    AssignSubjectNameLabel.innerHTML = "Subject Name";

  
    

    // AssignSubjectName Option
    var SubjectSelect = document.createElement("select");
    SubjectSelect.setAttribute("class","form-control");
    SubjectSelect.setAttribute("id","assignSubject");

    var SubjectOption=document.createElement("option");
    SubjectOption.setAttribute("value",AssignSubjectId);
    SubjectOption.innerHTML=AssignSubjectName;
    SubjectSelect.appendChild(SubjectOption);


    formGroupAssignSubjectOption.appendChild(CourseNameLabel);
    formGroupAssignSubjectOption.appendChild(CourseSelect);
    formGroupAssignSubjectName.appendChild(AssignSubjectNameLabel);
    formGroupAssignSubjectName.appendChild(SubjectSelect);




    //  Submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-primary btn-block");
    submitButton.innerHTML = "Edit AssignSubject";

    form.appendChild(hiddenAssignSubjectId);
    form.appendChild(formGroupAssignSubjectOption);
    form.appendChild(formGroupAssignSubjectName);
    form.appendChild(submitButton);

    modelBody.appendChild(successAlert);
    modelBody.appendChild(errorAlert);
    modelBody.appendChild(form);

    modelContent.appendChild(modelHeader);
    modelContent.appendChild(modelBody);

    modelCenter.appendChild(modelContent);

    editModel.appendChild(modelCenter);
    editAssignSubjectModel.appendChild(editModel);
}

// Edit AssignSubject
function editAssignSubject(event) {
    event.preventDefault();
    var ele = document.getElementById("editAssignSubjectSuccess");
    var err = document.getElementById("editAssignSubjectError");
    let editAssignSubject = new XMLHttpRequest();
    editAssignSubject.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
            if (response.status == 200) {
                ele.setAttribute("style", "display:block");
                ele.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                displayAssignSubject();
            }
            else {
                ele.setAttribute("style", "display:none");
                err.setAttribute("style", "display:block");
                err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
            }

        }
    }
    const editAssignSubjectData = {
        assignid: Number(event.target[0].value),
        Subjectidref:Number(event.target[2].value),
    }
    editAssignSubject.open("PUT", "https://localhost:44379/api/AssignSubject/UpdateAssignSubject", true);
    editAssignSubject.setRequestHeader("Content-Type", "application/json");
    editAssignSubject.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
     editAssignSubject.send(JSON.stringify(editAssignSubjectData));
}







// Display Student
function displayStudentDetail() {
    var studentDetail = new XMLHttpRequest();
    studentDetail.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);

            // Get Div
            let displayStudentTable = document.getElementById("studentTable");
            displayStudentTable.innerHTML = "";

            // Creating Table
            let studentTable = document.createElement("table");
            studentTable.setAttribute("class", "table table-hover");

            // Creating Thead
            let studentTableHeading = document.createElement("thead");

            // Creating Tr
            let studentTableRow = document.createElement("tr");

            // Creating Th
            let studentTableCell1 = document.createElement("th");
            studentTableCell1.innerHTML = "Student Id";

            let studentTableCell2 = document.createElement("th");
            studentTableCell2.innerHTML = "FirstName";

            let studentTableCell3 = document.createElement("th");
            studentTableCell3.innerHTML = "LastName";

            let studentTableCell4 = document.createElement("th");
            studentTableCell4.innerHTML = "Email";

            let studentTableCell5 = document.createElement("th");
            studentTableCell5.innerHTML = "Course";

            let studentTableCell6 = document.createElement("th");
            studentTableCell6.innerHTML = "IsActive";

            let studentTableCell7 = document.createElement("th");
            studentTableCell7.innerHTML = "Edit";

            studentTableRow.appendChild(studentTableCell1);
            studentTableRow.appendChild(studentTableCell2);
            studentTableRow.appendChild(studentTableCell3);
            studentTableRow.appendChild(studentTableCell4);
            studentTableRow.appendChild(studentTableCell5);
            studentTableRow.appendChild(studentTableCell6);
            studentTableRow.appendChild(studentTableCell7);

            studentTableHeading.appendChild(studentTableRow);


            // Student Table Body
            var studentTableBody = document.createElement("tbody");
            studentTableBody.setAttribute("id","searchStudentTable");

            response.response.map(function (item) {
                if (item.isActive == true) {
                    var tr = document.createElement('tr');
                }
                else {
                    var tr = document.createElement('tr');
                    tr.setAttribute("class", "bg-warning");
                    tr.setAttribute("title", "Student Is Not Active");
                }

                //Teacher Registration Id
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(item.regid));
                tr.appendChild(td);

                // Teacher First Name
                var td1 = document.createElement('td');
                td1.appendChild(document.createTextNode(item.firstname));
                tr.appendChild(td1);

                // Teacher Last Name
                var td2 = document.createElement('td');
                td2.appendChild(document.createTextNode(item.lastname));
                tr.appendChild(td2);



                // Teacher Email
                var td3 = document.createElement('td');
                td3.appendChild(document.createTextNode(item.email));
                tr.appendChild(td3);

                // Teacher Email
                var td4 = document.createElement('td');
                td4.appendChild(document.createTextNode(item.coursename));
                tr.appendChild(td4);


                // studentDetail IsActive
                var td5 = document.createElement('td');

                let div = document.createElement("div")
                div.setAttribute("class", "custom-control custom-checkbox");

                let chkbox = document.createElement("input");
                chkbox.setAttribute("type", "checkbox")
                chkbox.setAttribute("class", "custom-control-input");
                chkbox.setAttribute("id", "studentDetail" + item.regid);
                chkbox.setAttribute("value", item.regid);
                chkbox.setAttribute("onchange", "toggleStudentDetail(event)")

                let label = document.createElement("label");
                label.setAttribute("class", "custom-control-label");
                label.setAttribute("for", "studentDetail" + item.regid);
                div.appendChild(chkbox);
                div.appendChild(label);
                if (item.isActive == true) {

                    chkbox.setAttribute("Checked", "true");
                    label.innerHTML = "Active";
                    td5.appendChild(div);
                }
                else {
                    label.innerHTML = "Not Active";
                    td5.appendChild(div);
                }
                div.appendChild(chkbox);
                div.appendChild(label);
                tr.appendChild(td5);

                // studentDetail Edit Button
                var td6 = document.createElement('td');
                td6.innerHTML = '<button class="btn btn-primary mr-2" onclick="editStudentDetailModel(event)" slot="' + item.firstname + '" nonce="' + item.lastname + '"  id="' + item.regid + '" data-toggle="modal" data-target="#editStudentDetail' + item.regid + '" > <i class="fa fa-pencil"  aria-hidden="true"  slot="' + item.firstname + '" nonce="' + item.lastname + '"  id="' + item.regid + '"></i></button><button class="btn btn-danger"  onclick="deletestudentDetail(event)" value="sdbf"> <i class="fa fa-trash" aria-hidden="true" title="' + item.studentDetailid + '"></i></button>';
                tr.appendChild(td6)

                studentTableBody.appendChild(tr);
            });
            studentTable.appendChild(studentTableHeading);
            studentTable.appendChild(studentTableBody);

            displayStudentTable.appendChild(studentTable);
        }
        else if (this.status == 401) {

            alert();
        }
    }
    studentDetail.open("GET", "https://localhost:44379/api/Registration/GetStudentDetail", true);
    studentDetail.setRequestHeader("Content-type", "application/json");
    studentDetail.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    studentDetail.send();
}

// Active or InActive Student
function toggleStudentDetail(event) {
    event.preventDefault();
    var toggleActive = new XMLHttpRequest();
    toggleActive.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 200) {
                displayStudentDetail();
            }
            else {
                alert("not");
            }
        }
    }
    const StudentData = {
        regid: Number(event.target.value),
        isActive: Boolean(event.target.checked)
    }
    toggleActive.open("PUT", "https://localhost:44379/api/Registration/UpdateIsActive", true);
    toggleActive.setRequestHeader("Content-type", "application/json");
    toggleActive.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    toggleActive.send(JSON.stringify(StudentData));
}

// Edit StudentDetail Model
function editStudentDetailModel(event) {
    let RegId = event.target.id;
    let FirstName = event.target.slot;
    let LastName = event.target.nonce;

    var editStudentDetailModel = document.getElementById("editStudentDetailModal");
    // Creating Model

    // Start Model
    var editModel = document.createElement("div");
    editModel.setAttribute("class", "modal fade");
    editModel.setAttribute("id", "editStudentDetail" + RegId);

    editModel.setAttribute("tabindex", "-1");
    editModel.setAttribute("role", "dialog");
    editModel.setAttribute("aria-labelledby", "EditStudentDetailTitle")
    editModel.setAttribute("data-backdrop", "false");
    editModel.setAttribute("aria-hidden", "true");




    // Model Center
    var modelCenter = document.createElement("div");
    modelCenter.setAttribute("class", "modal-dialog modal-dialog-centered");
    modelCenter.setAttribute("role", "document");

    // Model Content
    var modelContent = document.createElement("div");
    modelContent.setAttribute("class", "modal-content");

    // Model Header
    var modelHeader = document.createElement("div");
    modelHeader.setAttribute("class", "modal-header");

    // Model Title
    var modelTitle = document.createElement("h5");
    modelTitle.setAttribute("class", "modal-title");
    modelTitle.setAttribute("id", "EditStudentDetailTitle")
    modelTitle.innerHTML = "Edit StudentDetail Detail";

    // Close Button
    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "close");
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.setAttribute("id", "close");

    // Close Icon
    var closeIcon = document.createElement("span");
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.innerHTML = "&times";

    closeButton.appendChild(closeIcon);

    modelHeader.appendChild(modelTitle);
    modelHeader.appendChild(closeButton);


    // Model body
    var modelBody = document.createElement("div");
    modelBody.setAttribute("class", "modal-body");

    // Success Notification Alert
    var successAlert = document.createElement("div");
    successAlert.setAttribute("class", "alert alert-success alert-dismissible fade show");
    successAlert.setAttribute("id", "editStudentDetailSuccess");
    successAlert.setAttribute("style", "display: none;");


    // Error Notification Alert
    var errorAlert = document.createElement("div");
    errorAlert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
    errorAlert.setAttribute("id", "editStudentDetailError");
    errorAlert.setAttribute("style", "display: none;");

    // Create Form
    var form = document.createElement("form");
    form.setAttribute("onsubmit", "editStudentDetail(event)");

    // Form Group For FirstName
    var formGroupFirstName = document.createElement("div");
    formGroupFirstName.setAttribute("class", "form-group");

    // Registration Id
    var registrationId = document.createElement("input");
    registrationId.setAttribute("type", "hidden");
    registrationId.setAttribute("value", RegId);

    // FirstName Label
    var firstNameLabel = document.createElement("label");
    firstNameLabel.setAttribute("for", "editFirstName");
    firstNameLabel.innerHTML = "First Name";

    // FirstName Input
    var firstNameInput = document.createElement("input");
    firstNameInput.setAttribute("type", "text");
    firstNameInput.setAttribute("class", "form-control");
    firstNameInput.setAttribute("id", "editFirstName");
    firstNameInput.setAttribute("placeholder", "Enter First Name");
    firstNameInput.setAttribute("value", FirstName);

    formGroupFirstName.appendChild(firstNameLabel);
    formGroupFirstName.appendChild(firstNameInput);


    // Form Group For LastName
    var formGroupLastName = document.createElement("div");
    formGroupLastName.setAttribute("class", "form-group");


    // LastName Label
    var lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "editLastName");
    lastNameLabel.innerHTML = "Last Name";

    // lastName Input
    var lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("type", "text");
    lastNameInput.setAttribute("class", "form-control");
    lastNameInput.setAttribute("id", "editLastName");
    lastNameInput.setAttribute("placeholder", "Enter Last Name");
    lastNameInput.setAttribute("value", LastName);

    formGroupLastName.appendChild(lastNameLabel);
    formGroupLastName.appendChild(lastNameInput);

    //  Submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("class", "btn btn-primary btn-block");
    submitButton.innerHTML = "Edit StudentDetail";

    form.appendChild(registrationId);
    form.appendChild(formGroupFirstName);
    form.appendChild(formGroupLastName);
    form.appendChild(submitButton);

    modelBody.appendChild(successAlert);
    modelBody.appendChild(errorAlert);
    modelBody.appendChild(form);

    modelContent.appendChild(modelHeader);
    modelContent.appendChild(modelBody);

    modelCenter.appendChild(modelContent);

    editModel.appendChild(modelCenter);
    editStudentDetailModel.appendChild(editModel);
}

// Edit StudentDetail
function editStudentDetail(event) {
    event.preventDefault();
    let editStudentDetail = new XMLHttpRequest();
    editStudentDetail.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            if (response.status == 200) {
                var ele = document.getElementById("editStudentDetailSuccess");
                ele.setAttribute("style", "display:block");
                ele.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
                displayStudentDetail();
            }
            else {
                var err = document.getElementById("editStudentDetailError");
                err.setAttribute("style", "display:block");
                err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message;
            }

        }
    }
    const editStudentDetailData = {
        regid: Number(event.target[0].value),
        firstname: event.target[1].value,
        lastname: event.target[2].value
    }
    // console.log(editStudentDetailData);
    editStudentDetail.open("PUT", "https://localhost:44379/api/Registration/UpdateRegistration", true);
    editStudentDetail.setRequestHeader("Content-Type", "application/json");
    editStudentDetail.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    editStudentDetail.send(JSON.stringify(editStudentDetailData));
}


// Add Student
function addStudentDetail(event) {
    event.preventDefault();
    var ele = document.getElementById("addStudentDetailSuccess");
    var err = document.getElementById("addStudentDetailError");
    if (event.target[3].value == event.target[4].value) {
        err.setAttribute("style", "display:none");
    var addStudentDetail = new XMLHttpRequest();
    addStudentDetail.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 200) {
                ele.setAttribute("style", "display:block");
                ele.innerHTML = response.message;
                document.getElementById("studentFirstname").value="";
                document.getElementById("studentLastname").value="";
                document.getElementById("studentEmail").value="";
                document.getElementById("studentPassword").value="";
                document.getElementById("studentCnfPassword").value="";
                displayStudentDetail();
            }
            else {
                ele.setAttribute("style", "display:none");
                err.setAttribute("style", "display:block");
                err.innerHTML = response.message;
            }
        }
    }
    const addStudentDetailData = {
        registration: {
            firstname: event.target[0].value,
            lastName: event.target[1].value,
            email: event.target[2].value,
            password: event.target[4].value,
            roleid: Number(1),
            isActive: Boolean(event.target[6].value)
        },
        studentAssignCourse: {
            stdcourseid: Number(event.target[3].value)
        }
    }
    addStudentDetail.open("POST", "https://localhost:44379/api/Registration/StudentRegistration", true);
    addStudentDetail.setRequestHeader("Content-type", "application/json");
    addStudentDetail.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    addStudentDetail.send(JSON.stringify(addStudentDetailData));
}
else {
    err.setAttribute("style", "display:block");
    err.innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Password and Comfirm Password are not matching';
}
}



$(document).ready(function(){

     // Filter Course 
     $("#searchCourse").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#searchCourseTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

     // Filter Subject
     $("#searchSubject").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#searchSubjectTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

     // Filter Teacher
     $("#searchTeacher").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#searchTeacherTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

    // Filter Assign Subject
    $("#searchAssignSubjectTeacher").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#searchAssignSubjectTeacherTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });

     // Filter Student Detail
     $("#searchStudent").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#searchStudentTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

  });
