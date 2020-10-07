const xtelg = [];
const ytelg = [];
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
                label: 'Gaasi hind',
                backgroundColor: 'rgb(75, 148, 220, 0.2)',
                borderColor: 'rgb(51, 100, 150, 1)',
                data: ytelg,
                borderWidth: 0.5,
                fill: true
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
    const url = 'https://dashboard.elering.ee/api/gas-balance/price?end=2020-11-20T11%3A11%3A11Z&start=2020-09-20T11%3A11%3A11Z'
    const response = await fetch(url);
    const data = await response.json();
    
    for(let i = 0; i < data.data.length; i++){
        let kuuPaev=new Date(data.data[i].timestamp*1000);
        if(kuuPaev<new Date()){
            //tulevikku ei kuva, pointless
            //toLocaleString("no-NO");
            
            xtelg.push(kuuPaev.toDateString());
        }
    }

    for(let i = 0; i < data.data.length; i++){
       let hind = (data.data[i].imbalance_buy_price)
       ytelg.push(hind)
    }
}

//elering api tahab sisestatud aega kujul 2020-11-20T11:11:11Z
//epoch
