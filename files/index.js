
let intervalID="";
let startTime=null;
let nowTime=null;
let operatingTime=new Date(startingTimeSerial);
let stopTime=null;
let restartTime=null;
let executionTime=new Date(startingTimeSerial);
let times=0;
let points=0;
let breaking = false;
let nowBreakTime=new Date(startingTimeSerial);
let totalBreakTime=new Date(startingTimeSerial);
let allBreakTime=new Date(startingTimeSerial);

let preBreakTime=new Date(startingTimeSerial);




function setOperatingTime(){
    if (toString.call(operatingTime) !== '[object Date]'){
        return;
    }
    operatingTime=timeSub(executionTime,allBreakTime);
    let timeArr=timeToArr(operatingTime);
    let text;
    if (timeArr[4]>=2){
        text=((timeArr[4]-1)*24+timeArr[3])+"h"+( '00' + timeArr[2] ).slice( -2 )+"m";
        if (timeArr[0]<500){
            document.getElementById('dot').style.color='black';
        }else{
            document.getElementById('dot').style.color='white';
        }
    }else if (timeArr[3]>=1){
        text=timeArr[3]+"h"+( '00' + timeArr[2] ).slice( -2 )+"m";
        if (timeArr[0]<500){
            document.getElementById('dot').style.color='black';
        }else{
            document.getElementById('dot').style.color='white';
        }
    }else{
        text=( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    }
    let span = document.getElementById('operatingTime');
    span.innerText=text;
}

// function setBreakTime(){
//     if (typeof startTime === 'undefined'){
//         return;
//     }
//     breakTimeSerial = nowTime.getTime() - stopTime.getTime();
//     operatingTime = new Date(startingTimeSerial+operatingTimeSerial);
//     let timeArr=timeToArr(operatingTime);
//     let text;
//     if (timeArr[3]>=1){
//         text=timeArr[3]+"h"+( '00' + timeArr[2] ).slice( -2 )+"m";
//         if (timeArr[0]<500){
//             document.getElementById('dot').style.color='black';
//         }else{
//             document.getElementById('dot').style.color='white';
//         }
//     }else{
//         text=( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
//     }
//     let span = document.gsetElementById('operatingTime');
//     span.innerText=text;
// }



function timesAdd(n = 1){
    times+=n;
    document.getElementsByClassName('countDisplay')[0].textContent=times;
    if(breaking){
    setAverage();
    setPerHour();
    }
    localSave_ifChecked();
}

function setAverage(){
    let ave;
    let ave2;
    if (toString.call(operatingTime) !== '[object Date]'){
        return;
    }
    if (times<=0){
        document.getElementById('averageTime').textContent=0;
        ave= new Date(startingTimeSerial);
        return;
    }
    let aveTimeSerial
    aveTimeSerial=(operatingTime.getTime()-startingTimeSerial)/times+startingTimeSerial;
    ave=new Date(aveTimeSerial);
    let timeArr=timeToArr(ave);
    let text;
    if (timeArr[3]>=1){
        text=timeArr[3]+"h"+( '00' + timeArr[2] ).slice( -2 )+"m";
    }else if(timeArr[2]>=1){
        text=timeArr[2]+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    }    else{
        text=timeArr[1]+"s";
    }
    document.getElementById('averageTime').textContent=text;

    if (toString.call(executionTime) !== '[object Date]'){
        return;
    }
    if (times<=0){
        document.getElementById('averageTime').textContent=0;
        ave2= new Date(startingTimeSerial);
        return;
    }
    let aveTimeSerial2
    aveTimeSerial2=(executionTime.getTime()-startingTimeSerial)/times+startingTimeSerial;
    ave2=new Date(aveTimeSerial2);
    timeArr=timeToArr(ave2);
    let text2;
    if (timeArr[3]>=1){
        text2=timeArr[3]+"h"+( '00' + timeArr[2] ).slice( -2 )+"m";
    }else if(timeArr[2]>=1){
        text2=timeArr[2]+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    }    else{
        text2=timeArr[1]+"s";
    }
    document.getElementById('averageTime2').textContent=text2;


}

function setPerHour(){
    if (typeof operatingTime === 'undefined'){
        return;
    }
    if (times<=0){
        document.getElementById('perMinute').textContent=0;
        document.getElementById('perHour').textContent=0;
        document.getElementById('perMinute2').textContent=0;
        document.getElementById('perHour2').textContent=0;
        return;
    }
    let minute = (operatingTime.getTime()-startingTimeSerial)/1000/60;
    let hour = minute/60;
    let perMinute = times/minute;
    let perHour = times/hour;
    document.getElementById('perMinute').textContent=Math.floor(perMinute*10)/10;
    document.getElementById('perHour').textContent=Math.floor(perHour*10)/10;

    
    if (typeof executionTime === 'undefined'){
        return;
    }
    let minute2 = (executionTime.getTime()-startingTimeSerial)/1000/60;
    let hour2 = minute2/60;
    let perMinute2 = times/minute2;
    let perHour2 = times/hour2;
    document.getElementById('perMinute2').textContent=Math.floor(perMinute2*10)/10;
    document.getElementById('perHour2').textContent=Math.floor(perHour2*10)/10;
}

function displayTime(){
    let timeArr;
    timeArr =timeToArr(startTime);
    gei('startTime').textContent='開始:'+( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分";
    timeArr =timeToArr(nowTime);
    gei('nowTime').textContent='時刻:'+( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分";
    timeArr =timeToArr(executionTime);
    gei('proccec').textContent=( '00' + ((timeArr[4]-1)*24+ timeArr[3]) ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    timeArr =timeToArr(allBreakTime);
    gei('allBreakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";

    let operatingTimeSerial = operatingTime.getTime()-startingTimeSerial;
    let executionTimeSerial = executionTime.getTime()-startingTimeSerial;
    let rate=Math.round(operatingTimeSerial*100/executionTimeSerial);
    gei('operatingRate').textContent=rate+':'+(100-rate)
}


function debug(){
    let timeArr;
    timeArr =timeToArr(startTime);
    gei('startTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分"+( '00' + timeArr[1] ).slice( -2 )+"秒";
    timeArr =timeToArr(nowTime);
    gei('nowTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分"+( '00' + timeArr[1] ).slice( -2 )+"秒";
    timeArr =timeToArr(stopTime);
    gei('breakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分"+( '00' + timeArr[1] ).slice( -2 )+"秒";
    timeArr =timeToArr(restartTime);
    gei('restartTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"時"+( '00' + timeArr[2] ).slice( -2 )+"分"+( '00' + timeArr[1] ).slice( -2 )+"秒";

        timeArr=timeToArr(preBreakTime)
        gei('preBreakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
        
    timeArr =timeToArr(nowBreakTime);
    gei('nowBreakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    timeArr =timeToArr(totalBreakTime);
    gei('totalBreakTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
    timeArr =timeToArr(operatingTime);
    gei('opeTime').textContent=( '00' + timeArr[3] ).slice( -2 )+"h"+( '00' + timeArr[2] ).slice( -2 )+"m"+( '00' + timeArr[1] ).slice( -2 )+"s";
}

function gei(id){
    return document.getElementById(id)
}

function inputStartTime(n = null){
    if (startTime===null){
        return;
    }
    if (n===null){
        startTime=new Date();
    }else{
        startTime.setMinutes(startTime.getMinutes()+n);
    }
    update2();
    localSave_ifChecked();
}
function inputBreakTime(n = null){
    if (n===null){
        return;
    }else{
        totalBreakTime.setMinutes(totalBreakTime.getMinutes()+n);
    }
    update2();
    localSave_ifChecked();
}

function inputTimes(){
    n=gei('setTimes').value;
    if (isNaN(n)){
        return;
    }else{
        times=Number(n);
    }
    timesAdd(0);
    update2();
    localSave_ifChecked();

}

// 没　時間単位変換　Date型に100分と指定すると1時40分と解釈される仕様を使えばいい

// function timeUnitConvert(num,from){
//     let units =  ['ms','s','min','h','d'];
//     let packAmount = [1000,60,60,24,30];
//     let ans=[0,0,0,0,0]
//     let start;
//     for (let i = 0;i<units.length;i++){
//         if (units[i] === from){
//             start = i;
//             break;
//         }
//     }
//     ans[start] = num
//     for (let i = start;i<units.length-1;i++){
//         ans[i+1] = Math.floor(ans[i]/packAmount[i]);
//         ans[i] = ans[i]-ans[i+1]*packAmount[i];
//     }
//     console.log(num.toString() + from);
//     console.log(ans);
//     let ansDate = new Date(2000,1,1,ans[3],ans[2],ans[1],ans[0])
//     console.log(timeFormat(ansDate));
//     console.log(timeFormat(new Date(0000,1,1,0,0,num)));
    
// }

