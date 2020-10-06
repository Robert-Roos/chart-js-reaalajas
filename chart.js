const xtelg = [];
const ytelg = [];

async function graaf() {
    await getData();
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xtelg,
            datasets: [{
                label: 'Gaasi hind',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: ytelg,
            }]
        },
        options: {
            responsive: false
        }
    });
}
graaf();

async function getData() {
    const url = 'https://dashboard.elering.ee/api/gas-balance/price?end=2020-11-20T11%3A11%3A11Z&start=2020-09-20T11%3A11%3A11Z'
    const response = await fetch(url);
    const data = await response.json();
    const kuuPaev = new Date(data.data[0].timestamp*1000);
    var koikKuuPaevad, i, x ="";
        for(i in data.data){
            x += data.data[i].timestamp;
        }
        console.log(x)
    xtelg.push(kuuPaev.toLocaleString());

    const ostuHind = data.data[0].imbalance_buy_price;
    var koikHinnad, i, x = ""; 
        for(i in data.data){
            x += data.data[i].imbalance_buy_price;
        }
        console.log(x)
    ytelg.push(ostuHind);


    //const myygiHind = data.data[0].imbalance_sell_price;
    console.log(kuuPaev.toLocaleString());
    console.log(ostuHind)
    //console.log(myygiHind) 
    //console.log(data.data)
}





//elering api tahab sisestatud aega kujul 2020-11-20T11:11:11Z
//epoch
