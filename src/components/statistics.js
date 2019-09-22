import {AbstractComponent} from '../utils';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TRANSFER_TYPES, ACTIVITY_TYPES} from '../utils';

export class Statistics extends AbstractComponent {
  constructor(eventsData) {
    super();
    this._eventsData = eventsData;
  }

  getTemplate() {
    return `<section class="statistics">
    <h2>Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
  }

  init() {
    const moneyChartElement = document.querySelector(`.statistics__chart--money`);
    const transportChartElement = document.querySelector(`.statistics__chart--transport`);
    const timeChartElement = document.querySelector(`.statistics__chart--time`);


    const trData = this._getTransportData();
    console.log(trData.map((type) => type.value));
    // this._transportChart = new Chart(transportChart, this._getChartConfig(`TRANSPORT`, this._getTransportData()));

    const transportChart = new Chart(transportChartElement, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: trData.map((item) => item.name),
        datasets: [{
          data: trData.map((item) => item.value)
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    });
  }

  _getTransportData() {
    // type of transport -> times used
    return TRANSFER_TYPES.map((type) => {
      return {
        name: type,
        value: this._eventsData.filter((event) => event.type === type).length
      };
    }).filter((dt) => (dt.value > 0));
  }


  _getMoneyData() {
    // event type -> total cost

  }

  _getTimeData() {
    // ? destination -> total time spent ?

  }
}
