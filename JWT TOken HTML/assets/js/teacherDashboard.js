{(()=>{
    document.getElementById("welcome").innerText="Welcome "+localStorage.getItem("firstname")+" "+localStorage.getItem("lastname");
    if(atob(localStorage.getItem("role"))==1){
        location.href="studentDashboard.html";
    }else if(atob(localStorage.getItem("role"))==3)
    {
        location.href="adminDashboard.html";
    }

    // Display Test
    displayTest();

    // Display Question
    displayQuestion();

})()}


// Display Test
function displayTest(){
    let displayTest=new XMLHttpRequest();
    displayTest.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let response=JSON.parse(this.responseText);
            console.log(response);
        }
    }
    displayTest.open("GET","",true);
    displayTest.setRequestHeader("Content-Type","application/json");
    displayTest.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    displayTest.send();
}

// Active or InActive Test
function toggleTest(event){
    event.preventDefault();
    let toggleTest=new XMLHttpRequest();
    toggleTest.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let response=JSON.parse(this.responseText);
            console.log(response);
        }
    }

    const toggleTestData={

    }

    toggleTest.open("PUT","",true);
    toggleTest.setResquestHeader("Content-Type","application/json");
    toggleTest.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    toggleTest.send(JSON.stringify(toggleTestData));

}

// Edit Test Model
function editTestModel(event){
    event.preventDefault();
    

}

// Edit Test
function editTest(event){
    event.preventDefault();
    let editTest=new XMLHttpRequest();
    editTest.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let response=JSON.parse(this.responseText);
            console.log(response);
        }
    }

    const editTestData={

    }

    editTest.open("","",true);
    editTest.setResquestHeader("Content-Type","application/json");
    editTest.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    editTest.send(JSON.stringify(editTestData));
}

// Add Test
function addTest(event){
    event.preventDefault();
    let addTest=new XMLHttpRequest();
    addTest.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let response=JSON.parse(this.responseText);
            console.log(response);
        }
    }

    const addTestData={
        assignidref:Number(event.target[0].value),
        testname:event.target[1].value,
        subjectidref:Number(event.target[2].value),
        isActive:Boolean(event.target[3].value)

    }

    addTest.open("POST","",true);
    addTest.setResquestHeader("Content-Type","application/json");
    addTest.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    addTest.send(JSON.stringify(addTestData));
}









// Display Question
function displayQuestion(){
    let displayQuestion=new XMLHttpRequest();
    displayQuestion.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let response=JSON.parse(this.responseText);
            console.log(response);
        }
    }
    displayQuestion.open("GET","",true);
    displayQuestion.setResquestHeader("Content-Type","application/json");
    displayQuestion.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    displayQuestion.send();
}

// Active or InActive Question
function toggleQuestio(){
    event.preventDefault();
    let toggleQuestion=new XMLHttpRequest();
    toggleQuestion.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let response=JSON.parse(this.responseText);
            console.log(response);
        }
    }

    const toggleQuestionData={

    }

    toggleQuestion.open("PUT","",true);
    toggleQuestion.setResquestHeader("Content-Type","application/json");
    toggleQuestion.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    toggleQuestion.send(JSON.stringify(toggleQuestionData));

}

// Edit Question Model
function editQuestionModel(event){
    event.preventDefault();
}

// Edit Question
function editQuestion(event){
    event.preventDefault();
    let editQuestion=new XMLHttpRequest();
    editQuestion.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let response=JSON.parse(this.responseText);
            console.log(response);
        }
    }

    const editQuestionData={

    }

    editQuestion.open("PUT","",true);
    editQuestion.setResquestHeader("Content-Type","application/json");
    editQuestion.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    editQuestion.send(JSON.stringify(editQuestionData));
}

// Add Question
function addQuestion(event){
    event.preventDefault();
    let addQuestion=new XMLHttpRequest();
    addQuestion.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let response=JSON.parse(this.responseText);
            console.log(response);
        }
    }

    const addQuestionData={
        testidref:Number(event.target[0].value),
        question:event.target[1].value,
        option1:event.target[2].value,
        option2:event.target[3].value,
        option3:event.target[4].value,
        option4:event.target[5].value,
        answer:event.target[6].value,
        isActive:Boolean(event.target[7].value)
    }

    addQuestion.open("POST","",true);
    addQuestion.setResquestHeader("Content-Type","application/json");
    addQuestion.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
    addQuestion.send(JSON.stringify(addQuestionData));
}

