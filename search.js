const urlPhrase=[
    ['https://jp.mercari.com/search?keyword=','&status=sold_out%7Ctrading&sort=created_time&order=desc','&status=on_sale&sort=price&order=asc','&price_min='],
    ['https://fril.jp/s?order=desc&query=','&sort=created_at&transaction=soldout','&transaction=selling&sort=sell_price&order=asc','&min=']
];

function search(n){
    if (n>1){
        return;
    }
    let keyword = $('#keyword').val();
    if (keyword === ''){
        return
    }
    let keywordURL = encodeURI(keyword);
    let url1=urlPhrase[n][0]+keywordURL+urlPhrase[n][1];
    let url2=urlPhrase[n][0]+keywordURL+urlPhrase[n][2];
    let minPrice = $('#minPrice').val();
    if (isNaN(minPrice)){
    }else if (minPrice<=300){
    }else{
        url1 += urlPhrase[n][3]+minPrice;
        url2 += urlPhrase[n][3]+minPrice;
    }
    window.open(url1);
    window.open(url2);
}