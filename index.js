let balances = [];
let sellingFees = [];
let prices = [];
let shippingFees = [];
let tableElement;
let rowLength;
let columnLength;
let shippingFeeList = [];
let yubinFeeList = [];
let yamatoFeeList = [];
let otherFeeList = [];

window.onload = f => {
    balances = [100, 200];
    tableElement = document.getElementById("mainTable");
    inputShippingFeeList();
    createMainTable();
    rowLength = tableElement.rows.length;
    columnLength = tableElement.rows[0].cells.length;
    createFeeTables();
    optionChanged();
}

window.addEventListener('load', function () {
    let inputTags = document.getElementById('mainTable').getElementsByTagName("input");
    let inputTagCount = inputTags.length;
    for (let i = 0; i < inputTagCount; i++) {
        inputTags[i].addEventListener("input", Calculation);
    }
    let radioTags = document.getElementsByName('shippingFee');
    let radioTagCount = radioTags.length;
    for (let i = 0; i < radioTagCount; i++) {
        radioTags[i].addEventListener("input", radioCheked);
    }
    let optionTags = document.getElementById('options').getElementsByTagName("input");
    let optionTagsCount = optionTags.length;
    for (let i = 0; i < optionTagsCount; i++) {
        optionTags[i].addEventListener("input", optionChanged);
    }
});

function createMainTable() {
    let tr = $('<tr>');
    let colLen = shippingFeeList[0].length - 2;
    //タイトル行
    tr.append($('<th>'));
    for (let i = 0; i < colLen; i++) {
        let th = $('<th>');
        th.text(shippingFeeList[0][i + 2]);
        tr.append(th);
    }
    $('#mainTable').append(tr);
    //販売価格
    tr = $('<tr>');
    tr.append($('<td>').text('販売価格'));
    for (let i = 0; i < colLen; i++) {
        let td = $('<td>');
        tr.append($('<td>').append($('<input>')));
    }
    $('#mainTable').append(tr);
    //送料
    tr = $('<tr>');
    tr.append($('<td>').text('送料'));
    for (let i = 0; i < colLen; i++) {
        let td = $('<td>');
        tr.append($('<td>').append($('<input>')));
    }
    $('#mainTable').append(tr);
    //手数料
    tr = $('<tr>');
    tr.append($('<td>').text('手数料'));
    for (let i = 0; i < colLen; i++) {
        let td = $('<td>');
        let rate = shippingFeeList[shippingFeeList.length - 1][i + 2]
        let html = '<input readonly> <br><span class="rate">(' + rate + ')</span>'
        tr.append($('<td>').html(html));
    }
    $('#mainTable').append(tr);
    //残高
    tr = $('<tr>');
    tr.append($('<td>').text('残高'));
    for (let i = 0; i < colLen; i++) {
        let td = $('<td>');
        tr.append($('<td>').append($('<input>')));
    }
    $('#mainTable').append(tr);
}

function Calculation() {
    let mode_gyakusan = document.getElementById('gyakusan').checked;
    if (mode_gyakusan) {
        Reverse();
    } else {
        Normal();
    }

}

function Reverse() {
    let targetRow;
    getRow(rowSearch("残高"), balances);
    if (!document.getElementById('kobetsu').checked) {
        for (let i = 1; i < columnLength; i++) {
            balances[i] = balances[0]
        }
        targetRow = rowSearch('残高');
        pasteRow(targetRow, balances)
    }
    getRow(rowSearch("送料"), shippingFees);
    //販売価格計算
    targetRow = rowSearch("販売価格");
    for (let i = 1; i < columnLength; i++) {
        let ans = priceCalculation[i - 1](Number(balances[i - 1]) + Number(shippingFees[i - 1]));
        if (isNaN(ans)) {
            ans = '';
        } else if (ans < 0) {
            ans = 0;
        }
        prices[i - 1] = ans;
    }
    pasteRow(targetRow, prices);
    //手数料計算
    targetRow = rowSearch("手数料");
    for (let i = 1; i < columnLength; i++) {
        let ans = sellingFeeCalculation[i - 1](prices[i - 1]);
        if (isNaN(ans)) {
            ans = '';
        }
        sellingFees[i - 1] = ans;
    }
    pasteRow(targetRow, sellingFees);

}

function Normal() {
    let targetRow;
    getRow(rowSearch("販売価格"), prices);
    if (!document.getElementById('kobetsu').checked) {
        for (let i = 1; i < columnLength; i++) {
            prices[i] = prices[0]
        }
        targetRow = rowSearch('販売価格');
        pasteRow(targetRow, prices)
    }
    getRow(rowSearch("送料"), shippingFees);

    //手数料計算
    targetRow = rowSearch("手数料");
    for (let i = 1; i < columnLength; i++) {
        let ans = sellingFeeCalculation[i - 1](prices[i - 1]);
        if (isNaN(ans)) {
            ans = '';
        }
        sellingFees[i - 1] = ans;
    }
    pasteRow(targetRow, sellingFees);

    //残高計算
    for (let i = 1; i < columnLength; i++) {
        let ans = prices[i - 1] - shippingFees[i - 1] - sellingFees[i - 1];
        if (isNaN(ans)) {
            ans = '';
        }
        balances[i - 1] = ans
    }

    pasteRow(rowLength - 1, balances);
}

function rowSearch(str) {
    for (let i = 0; i < rowLength; i++) {
        if (str === tableElement.rows[i].cells[0].innerText) {
            return i;
        }
    }
}

function getRow(row, arr) {
    for (let i = 1; i < columnLength; i++) {
        arr[i - 1] = tableElement.rows[row].cells[i].getElementsByTagName("input")[0].value;
    }
}

function pasteRow(row, arr) {
    for (let i = 1; i < columnLength; i++) {
        tableElement.rows[row].cells[i].getElementsByTagName("input")[0].value = arr[i - 1];
    }
}
function pasteRowInput(row, arr) {
    for (let i = 1; i < columnLength; i++) {
        tableElement.rows[row].cells[i].getElementsByTagName('input')[0].value = arr[i - 1];
    }
}

function radioCheked() {
    inputFee();
    Calculation();
}

function optionChanged() {
    let mode_kobetsu = document.getElementById('kobetsu').checked;
    let mode_gyakusan = document.getElementById('gyakusan').checked;
    let rowLen = document.getElementById('mainTable').getElementsByTagName('tr').length;
    let colLen = document.getElementById('mainTable').getElementsByTagName('tr')[1].getElementsByTagName('input').length;
    for (let i = 0; i < colLen; i++) {
        document.getElementById('mainTable').getElementsByTagName('tr')[1].getElementsByTagName('input')[i].readOnly = mode_gyakusan;
        document.getElementById('mainTable').getElementsByTagName('tr')[1].getElementsByTagName('input')[i].readOnly = mode_gyakusan;
        document.getElementById('mainTable').getElementsByTagName('tr')[rowLen - 1].getElementsByTagName('input')[i].readOnly = !mode_gyakusan;
        document.getElementById('mainTable').getElementsByTagName('tr')[rowLen - 1].getElementsByTagName('input')[i].readOnly = !mode_gyakusan;

    }

    if (!mode_kobetsu) {
        let rown1;
        let rown2;
        if (mode_gyakusan) {
            rown1 = rowLen - 1;
            rown2 = 1;
        } else {
            rown2 = rowLen - 1;
            rown1 = 1;
        }
        for (let i = 1; i < colLen; i++) {
            document.getElementById('mainTable').getElementsByTagName('tr')[rown1].getElementsByTagName('input')[i].readOnly = true;
        }
    } else {

    }

}

function inputFee() {
    let radiosFee = document.getElementsByName("shippingFee");
    let len = shippingFeeList.length;
    let checkValue = '';
    //選択項目を取得
    for (let i = 0; i < len; i++) {
        if (radiosFee[i].checked) {
            checkValue = radiosFee[i].value;
            break;
        }
    }
    if (checkValue === '') {
        return;
    }
    //料金表から選択項目の料金を取得
    let rownum;
    let colLen;
    for (let i = 1; i <= len; i++) {
        if (checkValue === shippingFeeList[i][0]) {
            rownum = i;
            colLen = shippingFeeList[i].length;
            break;
        }
    }
    //選んでないときなど、見つからないときは何もせず終了
    let shippingFees = [];
    for (let i = 0; i < (colLen - 2); i++) {
        shippingFees[i] = shippingFeeList[rownum][i + 2];
    }
    pasteRowInput(2, shippingFees)
}

function inputShippingFeeList() {
    let csv = new XMLHttpRequest();

    csv.open('get', 'shippingFeeList.csv', false);
    csv.send(null);

    let lines = csv.responseText.split(/\r\n|\n/);

    for (let i = 0; i < lines.length; i++) {
        let cells = lines[i].split(",");
        let colLen = cells.length;
        for (let j = 0; j < colLen; j++) {
            cells[j] = cells[j].replace(':', '\n');
        }
        shippingFeeList.push(cells);
    }
    let fnc = (feeList, i) => {
        do {
            let colLen = shippingFeeList[i].length;
            let copyRow = [];
            for (j = 0; j < colLen; j++) {
                copyRow.push(shippingFeeList[i][j]);
            }
            feeList.push(copyRow);
            i++;
        } while (shippingFeeList[i][0] !== '');
        return i;
    }
    i = 0
    i = fnc(yubinFeeList, i);
    i = fnc(yamatoFeeList, i);
    i = fnc(otherFeeList, i);

}
function createFeeTables() {
    createFeeTable('tbody-yubinFee', yubinFeeList);
    createFeeTable('tbody-yamatoFee', yamatoFeeList);
    createFeeTable2('tbody-otherFee', otherFeeList);
}
function createFeeTable(id, feeList) {
    let feeTable = document.getElementById(id);
    let rowLen = feeList.length;
    {
        let newRow = document.createElement('tr')
        let colLen = feeList[0].length
        let newCol = document.createElement('td');
        newCol.colSpan = 2;
        newCol.innerText = '発送方法';
        newRow.append(newCol);
        for (j = 2; j < colLen; j++) {
            let newCol = document.createElement('td');
            newCol.innerText = feeList[0][j];
            newRow.append(newCol);
        }
        feeTable.append(newRow);
    }
    for (i = 1; i < rowLen; i++) {
        let newRow = document.createElement('tr')
        let newCol = document.createElement('td');
        let newRadio = document.createElement('input');
        newRadio.type = 'radio';
        newRadio.name = 'shippingFee';
        newRadio.id = 'radio_' + feeList[i][0];
        newRadio.value = feeList[i][0];
        newCol.append(newRadio);
        newRow.append(newCol);
        let colLen = feeList[i].length
        for (j = 1; j < colLen; j++) {
            let newCol = document.createElement('td');
            let newLabel = document.createElement('label');
            newLabel.htmlFor = 'radio_' + feeList[i][0];
            newLabel.innerText = feeList[i][j];
            newCol.appendChild(newLabel);
            newRow.append(newCol);
        }
        feeTable.append(newRow);
    }
}
function createFeeTable2(id, feeList) {
    let feeTable = document.getElementById(id);
    let rowLen = feeList.length;
    {
        let newRow = document.createElement('tr')
        let newCol = document.createElement('td');
        newCol.colSpan = 2;
        newCol.innerText = '発送方法';
        newRow.append(newCol);
        newCol = document.createElement('td');
        newCol.innerHTML = '(共通)<br><span style ="color:red;font-weight: bold;font-size:20px; ">[ペイフリは不可]</span>';
        newRow.append(newCol);
        feeTable.append(newRow);
    }
    for (i = 1; i < rowLen; i++) {
        let newRow = document.createElement('tr')
        let newCol = document.createElement('td');
        let newRadio = document.createElement('input');
        newRadio.type = 'radio';
        newRadio.name = 'shippingFee';
        newRadio.id = 'radio_' + feeList[i][0];
        newRadio.value = feeList[i][0];
        newCol.append(newRadio);
        newRow.append(newCol);
        for (j = 1; j < 3; j++) {
            let newCol = document.createElement('td');
            let newLabel = document.createElement('label');
            newLabel.htmlFor = 'radio_' + feeList[i][0];
            newLabel.innerText = feeList[i][j];
            newCol.appendChild(newLabel);
            newRow.append(newCol);
        }
        feeTable.append(newRow);
    }
}

function tabClick(n) {
    let labels = document.getElementsByClassName('tabLabel');
    let cnt = labels.length;
    for (i = 0; i < cnt; i++) {
        if (i === n) {
            labels[i].classList.add('tabOn');
        } else {
            labels[i].classList.remove('tabOn');
        }
    }
}

function spin(n) {
    let mode_gyakusan = document.getElementById('gyakusan').checked;
    if (mode_gyakusan) {
        getRow(rowSearch("残高"), balances);
        for (let i = 0; i < columnLength; i++) {
            if (!isNaN(balances[i])) {
                balances[i] = String(Number(balances[i]) + n);
            }
        }
        pasteRow(rowSearch("残高"), balances);
    } else {
        getRow(rowSearch("販売価格"), prices);
        for (let i = 0; i < columnLength; i++) {
            if (!isNaN(prices[i])) {
                prices[i] = String(Number(prices[i]) + n);
            }
        }
        targetRow = rowSearch('販売価格');
        pasteRow(rowSearch("販売価格"), prices);
    }
    Calculation();
}