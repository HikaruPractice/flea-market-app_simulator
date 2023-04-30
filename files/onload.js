window.onload=()=>{
    localLoad();
    window.onbeforeunload=()=>{
        if(document.getElementById('checkbox').checked){
            return '';
        }
    }
    
}
