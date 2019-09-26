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
  toRAW(eventData) {
    return {
      'id': eventData.id ? eventData.id : null,
      'type': eventData.type,
      'date_from': eventData.dateStart,
      'date_to': eventData.dateStart + eventData.duration,
      'destination': eventData.destination,
      'base_price': eventData.price,
      'is_favorite': eventData.isFavorite,
      'offers': eventData.options // TODO: update format
    };
  }

  static parseEvent(eventData) {
    return new EventAdapter(eventData);
  }

  static parseEvents(eventData) {
    return eventData.map(EventAdapter.parseEvent);
  }
}
