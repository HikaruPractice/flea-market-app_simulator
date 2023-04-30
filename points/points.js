
function start(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="block";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = true;
    document.getElementById("inputPointsArea").disabled=false;
    document.getElementById("inputPointsButton").disabled=false;
    startTime = new Date();
    breaking=false;
    localSave_ifChecked();
    intervalID=setInterval(update,500);


}

function restart(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="block";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = true;
    restartTime = new Date();
    setTimeDifference(preBreakTime,stopTime,restartTime);
    totalBreakTime = timeAdd(totalBreakTime,preBreakTime);
    allBreakTime.setTime(totalBreakTime.getTime());
    breaking=false;
    localSave_ifChecked();
}


function fin(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="block";
    document.getElementsByClassName("stop")[0].style.display="none";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = false;


    stopTime=new Date();
    update();
    
    breaking=true;
    localSave_ifChecked();
}

function reset(loadmode=false){
    document.getElementsByClassName("start")[0].style.display="block";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="none";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = false;
    document.getElementById("inputPointsArea").disabled=true;
    document.getElementById("inputPointsButton").disabled=true;
    if (intervalID!==""){
    clearInterval(intervalID);
    intervalID="";
    }
    breaking=false;

    startTime=null;
    nowTime=null;
    operatingTime.setTime(startingTimeSerial);
    stopTime=null;
    restartTime=null;
    executionTime.setTime(startingTimeSerial);
    times=0;
    points=0;
    nowBreakTime.setTime(startingTimeSerial);
    totalBreakTime.setTime(startingTimeSerial);
    allBreakTime.setTime(startingTimeSerial);

    preBreakTime.setTime(startingTimeSerial);

    document.getElementById('dot').style.color='white';
    document.getElementById('operatingTime').innerText="";
    document.getElementsByClassName('countDisplay')[0].textContent=0;
    document.getElementById('perMinute').textContent=0;
    document.getElementById('perHour').textContent=0;
    if (!loadmode){
        localRemove();
    }
}
function update(){
    nowTime= new Date();
    setTimeDifference(executionTime,startTime,nowTime);
    if (breaking){
        setTimeDifference(nowBreakTime,stopTime,nowTime);
        allBreakTime=timeAdd(totalBreakTime,nowBreakTime);
    }else{
    
    setOperatingTime();
    }
    //debug();
    setAverage();
    setPerHour();
    setPointsPerHour();
    displayTime();
}


function pointsAdd(n = 0){
    points+=Number(n);
    document.getElementsByClassName('pointsDisplay')[0].textContent=points;
    if(breaking){
    setPointsPerHour();
    }
    localSave_ifChecked();
}



function setPointsPerHour(){
    if (typeof operatingTime === 'undefined'){
        return;
    }
    if (points<=0){
        document.getElementById('pointsPerMinute').textContent=0;
        document.getElementById('pointsPerHour').textContent=0;
        document.getElementById('pointsPerMinute2').textContent=0;
        document.getElementById('pointsPerHour2').textContent=0;
    }
    let minute = (operatingTime.getTime()-startingTimeSerial)/1000/60;
    let hour = minute/60;
    let perMinute = points/minute;
    let perHour = points/hour;
    document.getElementById('pointsPerMinute').textContent=Math.floor(perMinute*10)/10;
    document.getElementById('pointsPerHour').textContent=Math.floor(perHour*10)/10;

    
    if (typeof executionTime === 'undefined'){
        return;
    }
    let minute2 = (executionTime.getTime()-startingTimeSerial)/1000/60;
    let hour2 = minute2/60;
    let perMinute2 = points/minute2;
    let perHour2 = points/hour2;
    document.getElementById('pointsPerMinute2').textContent=Math.floor(perMinute2*10)/10;
    document.getElementById('pointsPerHour2').textContent=Math.floor(perHour2*10)/10;
}










function addInputPoints(){

    inp = document.getElementById("inputPointsArea").value;
    if (!isNaN(inp)){
        pointsAdd(inp);
        timesAdd();
    }
    document.getElementById("inputPointsArea").value='';
}

function subInputPoints(){
    inp = document.getElementById("inputPointsArea").value;
    if (!isNaN(inp)){
        pointsAdd(-inp);
    }
    document.getElementById("inputPointsArea").value='';
}


function restart2(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="block";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = true;

    document.getElementById("inputPointsArea").disabled=false;
    document.getElementById("inputPointsButton").disabled=false;

}
function fin2(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="block";
    document.getElementsByClassName("stop")[0].style.display="none";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = false;

}

function update2(){
    nowTime= new Date();
    setTimeDifference(executionTime,startTime,nowTime);

    if (breaking){
        setTimeDifference(nowBreakTime,stopTime,nowTime);
        allBreakTime=timeAdd(totalBreakTime,nowBreakTime);
    }else{
        allBreakTime.setTime(totalBreakTime);
    }
    setOperatingTime();

    setAverage();
    setPerHour();
    setPointsPerHour();
    displayTime();

    //debug();
}