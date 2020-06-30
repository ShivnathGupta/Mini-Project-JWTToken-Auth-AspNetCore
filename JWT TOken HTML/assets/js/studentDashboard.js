{(()=>{
    document.getElementById("welcome").innerText="Welcome "+localStorage.getItem("firstname")+" "+localStorage.getItem("lastname");
    if(atob(localStorage.getItem("role"))==2){
        location.href="teacherDashboard.html"

    }else if(atob(localStorage.getItem("role"))==3){
        location.href="adminDashboard.html"
    }
})()}