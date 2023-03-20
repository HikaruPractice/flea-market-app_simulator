let balances = [];
let sellingFees = [];
let tableElement;
let rowLength ;
let columnLength;
let sellingFeeCalculation=[feeMercari,feeRakuma];

window.onload = f => {
    balances = [100, 200];
    tableElement = document.getElementById("mainTable");
    rowLength = tableElement.rows.length;
    columnLength = tableElement.rows[0].cells.length;
}

window.addEventListener('DOMContentLoaded', function(){
    let inputTags = document.getElementById('mainTable').getElementsByTagName("input");
    let inputTagCount = inputTags.length;
    for (let i = 0;i<inputTagCount;i++){
        inputTags[i].addEventListener("input",Calculation);
    }
    let radioTags = document.getElementById('shippingFee').getElementsByTagName("input");
    let radioTagCount = radioTags.length;
    for (let i = 0;i<radioTagCount;i++){
        radioTags[i].addEventListener("input",radioCheked);
    }
  });


function Calculation() {
    let prices = [];
    let shippingFees = [];
    let targetRow;
    getRow(rowSearch("販売価格"),prices);
    getRow(rowSearch("送料"),shippingFees);
    targetRow=rowSearch("手数料");
    for (let i = 1;i<columnLength;i++){
        let ans = sellingFeeCalculation[i-1](prices[i-1]);
        if(isNaN(ans)){
            ans = '';
        }
        balances[i-1] = ans
        sellingFees[i-1] = ans;
    }
    pasteRow(targetRow,sellingFees);

    //残高計算
    for (let i = 1;i<columnLength;i++){
        let ans =prices[i-1]-shippingFees[i-1]-sellingFees[i-1];
        if(isNaN(ans)){
            ans = '';
        }
        balances[i-1] = ans
    }

    pasteRow(rowLength-1,balances);

}

function rowSearch(str) {
    for (let i = 0; i < rowLength; i++) {
        if (str === tableElement.rows[i].cells[0].innerText) {
            return i;
        }
    }
}

function getRow(row,arr){
    for (let i = 1; i < columnLength; i++) {
        arr[i - 1] = tableElement.rows[row].cells[i].getElementsByTagName("input")[0].value;
    }
}

function pasteRow(row,arr){
    for (let i = 1; i < columnLength; i++) {
        tableElement.rows[row].cells[i].textContent = arr[i - 1];
    }
}
function pasteRowInput(row,arr){
    for (let i = 1; i < columnLength; i++) {
        tableElement.rows[row].cells[i].getElementsByTagName('input')[0].value = arr[i - 1];
    }
}

function feeMercari(price){
    return Math.floor(price * 0.1);
}
function feeRakuma(price){
    return Math.floor(price * 0.066);
}

function radioCheked(){
    inputFee();
    Calculation();
}

function inputFee(){
    let radiosFee = document.getElementsByName("shippingFee");
    let len = radiosFee.length;
    let checkValue = '';
    //選択項目を取得
    for (let i = 0;i<len;i++){
        if(radiosFee[i].checked){
            checkValue = radiosFee[i].value;
            break;
        }
    }
    //料金表から選択項目の料金を取得
    let rownum;
    let colLen ;
    for (let i = 1;i<=len;i++){
        if (checkValue === shippingFeeList[i][0]){
            rownum = i;
            colLen =             shippingFeeList[i].length;
            break;
        }
    }
        //選んでないときなど、見つからないときは何もせず終了
    if (checkValue === ''){
        return;
    }
    let shippingFees = [];
    for (let i = 0;i<(colLen-2);i++){
        shippingFees[i] = shippingFeeList[rownum][i+2];
    }
    pasteRowInput(2,shippingFees)
}

let savedisplay

function vitivilityTest(){
    if(document.getElementById('shippingFee').style.display === 'none'){
        document.getElementById('shippingFee').style.display = savedisplay
    }else{
        savedisplay =document.getElementById('shippingFee').style.display
        document.getElementById('shippingFee').style.display = 'none';
    }
}