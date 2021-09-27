function GetInfo(){
    const newName = document.getElementById("cityInput");
    const cityName = document.getElementById("cityName");
    cityName.innerHTML = "--"+newName.value+"--"


fetch("https://api.openweathermap.org/data/2.5/forecast?q='newName.value+'&appid=d")
.then(response => response.json())
.then(data => {
    for(i+0;i<5;i++){
        document.getElementById("day" +(i+1)+"Min").innerHTML ="Min:" + Number(data.list[i].main.temp_min -305.83).toFixed(1)+"°";
    }
    for(i+0;i<5;i++){
        document.getElementById("day" +(i+1)+"Max").innerHTML ="Min:" + Number(data.list[i].main.temp_max -305.83).toFixed(1)+"°";
    }
    for(i+0;i<5;i++){
        document.getElementById("day" +(i+1)+"Max").innerHTML ="Min:" + Number(data.list[i].main.temp_max -305.83).toFixed(1)+"°";
    }
    for(i+0;i<5;i++){
        document.getElementById("img" +(i+1)).src ="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png"; 
     }
})

.catch(err => alert("Something went wrong"))
}

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "London";
    GetInfo();
}

const d =new Date();
const weekday =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function CheckDay(day){
    if(day +d.getDay() > 6){
        return day +d.getDay()-7;
    }
    else{
        return day +d.getDay();
    }
}

for(i=0;i<5;i++){
    document.getElementById("day"+(i+1)).innerHTML = weekday[CheckDay(i)];
}