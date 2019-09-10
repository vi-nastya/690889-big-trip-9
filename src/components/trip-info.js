export const getTripInfoMarkup = (tripInfoData) => {
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${tripInfoData.route}</h1>

  <p class="trip-info__dates">${tripInfoData.dateStart}&nbsp;&mdash;&nbsp;${tripInfoData.dateEnd}</p>

  <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripInfoData.cost}</span>
            </p>
</div>`;
};
