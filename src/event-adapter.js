export class EventAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.description = data[`destination`][`description`] || ``;
    this.dateStart = data[`date_from`];
    this.duration = data[`date_to`] - data[`date_from`];
    this.price = data[`base_price`];
    this.city = data[`destination`][`name`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.offers = data[`offers`];
  }

  // app data -> server data
  toRAW() {
    return {
      'id': this.id,
      'type': this.type,
      'date_from': this.dateStart,
      'date_to': this.dateStart + this.duration,
      'destination': {
        'name': this.destination,
        'description': this.description,
        'pictures': this.pictures // TODO: add picture descriptions to model
      },
      'base_price': this.price,
      'is_favorite': this.isFavorite,
      'offers': this.offers // TODO: update format
    };
  }

  static parseEvent(data) {
    return new EventAdapter(data);
  }

  static parseEvents(data) {
    return data.map(EventAdapter.parseEvent);
  }
}
