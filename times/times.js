
function start(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="block";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = true;
    document.getElementById("countDisplay").disabled=false;
    document.getElementById("countMinus").disabled=false;
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
    document.getElementById("countDisplay").disabled=true;
    document.getElementById("countMinus").disabled=true;
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
    displayTime();
}
function restart2(){
    document.getElementsByClassName("start")[0].style.display="none";
    document.getElementsByClassName("restart")[0].style.display="none";
    document.getElementsByClassName("stop")[0].style.display="block";
    document.getElementsByClassName("reset")[0].style.display="block";
    document.getElementsByClassName("reset")[0].disabled = true;
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
    displayTime();
    //debug();
}