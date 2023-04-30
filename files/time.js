const startingTimeSerial = new Date("0001",1,1,0,0,0,0).getTime();
function setTimeDifference(targetDateObject,startTime_DateObject,endTime_DateObject){
    targetDateObject.setTime(endTime_DateObject.getTime()-startTime_DateObject.getTime()+startingTimeSerial);
}
function timeAdd(Time1_DateObject,Time2_DateObject){
    return new Date(Time1_DateObject.getTime()+Time2_DateObject.getTime()-startingTimeSerial);
}
function timeSub(Time1_DateObject,Time2_DateObject){
    return new Date(Time1_DateObject.getTime()-Time2_DateObject.getTime()+startingTimeSerial);
}


function timeToArr(DateObject){
    //[FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds]
    if (toString.call(DateObject) !== '[object Date]'){
        return [0,0,0,0,0,0,0];
    } 
    
    let arr = [];
    arr[0]=DateObject.getTime() % 1000;
    if (arr[0]<0){
        arr[0]+=1000;
    }
    arr[1]=DateObject.getSeconds();
    arr[2]=DateObject.getMinutes();
    arr[3]=DateObject.getHours();
    arr[4]=DateObject.getDate();
    arr[5]=DateObject.getMonth();
    arr[6]=DateObject.getFullYear();
    return arr;
}

function timeFormat(DateObject,jikan = false){
    let hours;
    let minutes = DateObject.getMinutes();
    let seconds = DateObject.getSeconds();
    if (jikan){
        hours = Math.floor((DateObject.getTime()-new Date(0001,1,1).getTime())/60/60/1000);
        if(hours>0){
            return hours+'時間'+minutes+'分'+seconds+'秒';
        }else if(minutes>0){
            return minutes+'分'+seconds+'秒';
        }else if(seconds>=0){
            return seconds+'秒';
        }else{
            return 0;
        }
    }else{
        hours = DateObject;
        return hours.getHours().toString().padStart(2,'0')+'時'+minutes.toString().padStart(2,'0')+'分'+seconds.toString().padStart(2,'0')+'秒';
    }
}