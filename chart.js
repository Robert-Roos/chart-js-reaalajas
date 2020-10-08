const url = 'https://dashboard.elering.ee/api/gas-balance/price?end=2020-11-20T11%3A11%3A11Z&start=2020-09-20T11%3A11%3A11Z'
const url2 = 'https://dashboard.elering.ee/api/gas-balance/price?end=2019-11-20T11%3A11%3A11Z&start=2019-09-20T11%3A11%3A11Z'
const xtelg = [];
const ytelg = [];
const xtelg2 = [];
const ytelg2 = [];
let chart;

// idee - mida peab kippar silmas reaalajas andmete all. praegu apist saame kord päevas uued andmed.
// kui soov näha graafikut muutumas siis ilmselt peaksime otsima mingi api veel juurde, mis andmetega pritsib
// või fakema muutuvaid andmeid nt random genega või mõne cron jobiga (või koos)
// chart.data.datasets[0].data[2] = 20;
// chart.update();

async function graaf() {
    await getData();
    const g = document.getElementById('myChart').getContext('2d');
    chart = new Chart(g, {
        type: 'line',
        data: {
            labels: xtelg,
            datasets: [{
                label: 'Gaasi hind 2020',
                backgroundColor: 'rgb(75, 148, 220, 0.2)',
                borderColor: 'rgb(51, 100, 150, 1)',
                data: ytelg,
                borderWidth: 0.5,
                fill: true
            }, {
                label: 'Gaasi hind 2019',
                backgroundColor: 'rgb(178, 34, 34, 0.2)',
                borderColor: 'rgb(139, 0, 0, 1)',
                data: ytelg2,
                borderWidth: 0.5,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
               xAxes: [{
                    ticks: {
                        fontSize: 13
                    }
                }]
            },
            tooltips: {
                mode: 'nearest',
                axis: 'x',
                intersect:false,
                displayColors:false,
                caretSize:10
            }
        }
    });
}
graaf();

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    const response2 = await fetch(url2);
    const data2 = await response2.json();

    for(let i = 0; i < data.data.length; i++){
        let kuuPaev=new Date(data.data[i].timestamp*1000);
        if(kuuPaev<new Date()){          
            xtelg.push(kuuPaev.toLocaleString(undefined, { 
                    day : '2-digit',
                    month : '2-digit'
            }));
        }
    }

    for(let i = 0; i < data.data.length; i++){
       let hind = (data.data[i].imbalance_buy_price)
       ytelg.push(hind)
    }

    for(let i = 0; i < data2.data.length; i++){
        let hind2 = (data2.data[i].imbalance_buy_price)
        ytelg2.push(hind2)
    }
}

// selle aasta api #massivegraaf- 'https://dashboard.elering.ee/api/gas-balance/price?end=2020-12-31T00%3A00%3A00Z&start=2020-01-01T00%3A00%3A00Z'
