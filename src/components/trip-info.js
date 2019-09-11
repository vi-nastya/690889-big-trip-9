export const getTripInfoMarkup = (tripInfoData) => {
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${tripInfoData.route}</h1>

  <p class="trip-info__dates">${tripInfoData.dateStart}&nbsp;&mdash;&nbsp;${tripInfoData.dateEnd}</p>

</div>`;
};
