export class EventAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.dateStart = data[`date_from`];
    this.duration = data[`date_to`] - data[`date_from`];
    this.price = data[`base_price`];
    this.destination = data[`destination`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.options = data[`offers`];
  }

  // app data -> server data
  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'date_from': this.dateStart,
      'date_to': this.dateStart + this.duration,
      'destination': this.destination,
      'base_price': this.price,
      'is_favorite': this.isFavorite,
      'offers': this.options // TODO: update format
    };
  }

  static parseEvent(data) {
    return new EventAdapter(data);
  }

  static parseEvents(data) {
    return data.map(EventAdapter.parseEvent);
  }
}
