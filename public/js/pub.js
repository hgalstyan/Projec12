const checked = document.querySelector(".check span");
const status = document.querySelectorAll(".isOpen");
const stars = document.querySelectorAll(".stars");

function check(pub){
    pub.classList.toggle("checked");
    checked.innerHTML = document.querySelectorAll(".checked").length;
}


function isOpen(stat){
    stat.forEach(e => {
        if(e.innerHTML==="Open") e.style.color="#266e24";
        else e.styles.color="#99120B";
    });
}

function rating(stars){
    stars.forEach(e=>{
        if(e.innerHTML == 5) e.style.color="#daa520";
        else if(e.innerHTML>=4) e.style.color="#1f5a1e";
        else if(e.innerHTML>=3) e.style.color="#810f09";
        else e.style.color = "#232323";
    });
}

isOpen(status);

rating(stars);

