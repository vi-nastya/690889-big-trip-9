import {AbstractComponent} from '../utils';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TRANSFER_TYPES, EVENT_TYPES, MILLISECONDS_IN_HOUR} from '../utils';
import { METHODS } from 'http';

export class Statistics extends AbstractComponent {
  constructor(eventsData) {
    super();
    this._eventsData = eventsData;
    this._hidden = true;
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

    const transportChart = new Chart(transportChartElement, this._getChartConfig(`Transport`, this._getTransportData()));
    const moneyChart = new Chart(moneyChartElement, this._getChartConfig(`Money`, this._getMoneyData()));
    const timeChart = new Chart(timeChartElement, this._getChartConfig(`Time`, this._getTimeData()));
  }

  _getChartConfig(title, data) {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: data.map((item) => item.name),
        datasets: [{
          data: data.map((item) => item.value)
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
        text: title,
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
          fontSize: 16
        }
      }
    };
  }

  _getTransportData() {
    // type of transport -> times used
    return TRANSFER_TYPES.map((type) => {
      return {
        name: type,
        value: this._eventsData.filter((event) => event.type === type).length
      };
    }).filter((data) => (data.value > 0));
  }

  _getMoneyData() {
    // type of event -> total cost
    return EVENT_TYPES.map((type) => {
      const events = this._eventsData.filter((event) => event.type === type);
      return {
        name: type,
        value: events.length ? events.map((event) => event.price).reduce((accumulator, currentValue) => accumulator + currentValue) : 0
      };
    }).filter((data) => (data.value > 0));
  }


  _getTimeData() {
    // type of event -> total time spent
    return EVENT_TYPES.map((type) => {
      const events = this._eventsData.filter((event) => event.type === type);
      return {
        name: type,
        value: events.length ? events.map((event) => event.duration).reduce((accumulator, currentValue) => accumulator + currentValue) : 0
      };
    }).filter((data) => (data.value > 0)).map((data) => {
      return {
        name: data.name,
        value: Math.round(data.value / MILLISECONDS_IN_HOUR)
      };
    });

  }

  hide() {
    if (!this._hidden) {
      document.querySelector(`.statistics`).classList.add(`visually-hidden`);
      this._hidden = true;
    }
  }

  show() {
    if (this._hidden) {
      document.querySelector(`.statistics`).classList.remove(`visually-hidden`);
      this._hidden = false;
    }
  }
}
