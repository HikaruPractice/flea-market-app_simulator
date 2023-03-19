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

function feeMercari(price){
    return Math.floor(price * 0.1);
}
function feeRakuma(price){
    return Math.floor(price * 0.066);
}