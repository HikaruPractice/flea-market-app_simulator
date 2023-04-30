function localSave(){
    const cts=(obj)=>{
        if (Object.prototype.toString.call(obj) === '[object Date]'){
            return obj.getTime();
        }else{
            return null;
        }
    }
    let datas = {
        times:times,
        points:points,
        breaking:breaking,
        startTimeSerial:cts(startTime),
        stopTimeSerial:cts(stopTime),
        restartTimeSerial:cts(restartTime),
        totalBreakTimeSerial:cts(totalBreakTime),
    }
    let jsonString = JSON.stringify(datas);
    localStorage.setItem(savename,jsonString);
}
function localSave_ifChecked(){
    if (!document.getElementById('checkbox').checked){
        localSave();
    }
}

function localLoad(){
    reset(true);
    const datas = JSON.parse(localStorage.getItem(savename));
    if (datas === null){
        return;
    }
    breaking=datas.breaking;
    if (breaking === null){
        return;
    }
    const cto=(timeSerial)=>{
        if (timeSerial !== 'null'){
            return new Date(timeSerial);
        }else{
            return null;
        }
    }
    startTime=cto(datas.startTimeSerial);
    if ((new Date()-startTime)>24*60*60*1000){
        reset();
        return;
    }

    stopTime=cto(datas.stopTimeSerial);
    restartTime=cto(datas.restartTimeSerial);
    totalBreakTime=cto(datas.totalBreakTimeSerial);
    timesAdd(datas.times);
    if (datas.points>0){
        pointsAdd(datas.points);
    }
    if(breaking){
        fin2();
    }else{
        restart2();
    }
    document.getElementById("countDisplay").disabled=false;
    document.getElementById("countMinus").disabled=false;
    update2();
    intervalID=setInterval(update,500);
}
function localRemove(){
    localStorage.removeItem(savename);
}
function localClear(){
    localStorage.clear();
    document.getElementById('checkbox').checked = true;
}



function checkboxChenge(){
    if (document.getElementById('checkbox').checked){
        localRemove();
    }else{
        localSave();
    }
}