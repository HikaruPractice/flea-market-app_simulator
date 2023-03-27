
let sellingFeeCalculation = [feeMercari, feeRakuma,feePay,feeYahoo];
let priceCalculation = [priceMercari, priceRakuma,pricePay,priceYahoo];
function feeMercari(price) {
    return Math.floor(price * 0.1);
}
function priceMercari(amount) {
    let m= amount % 9;
    if (m === 0){
        return Math.floor(amount / 0.9)-1;
    } 
    return Math.floor(amount / 0.9);
}
function feeRakuma(price) {
    return Math.floor(price * 0.066);
}
function priceRakuma(amount) {
    const b = [15,29,43,57,71,85,100,114,128,142,156,170,184,199,213,227,241,255,269,284,298,312,326,340,354,368,383,397,411,425,439,453,467    ]
    let d =Math.floor(amount / 468);
    let m = amount - d * 468;
    for (let i=0;i<33;i++){
        if (m <= b[i]){
            return d*33+i+amount;
        }
    }
}
function feePay(price){
    return Math.floor(price * 0.05);
}

function pricePay(amount){
    let m= amount % 19;
    if (m === 0){
        return Math.floor(amount / 0.95)-1;
    } 
    return Math.floor(amount / 0.95);
}

function feeYahoo(price){
    return Math.floor(price * 0.088);
}

function priceYahoo(amount){
    const b = [11,21,32,42,52,63,73,83,94,104,114]
    let d =Math.floor(amount / 114);
    let m = amount - d *114;
    for (let i=0;i<11;i++){
        if (m <= b[i]){
            return d*11+i+amount;
        }
    }
}