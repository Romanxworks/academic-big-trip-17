import {FilterType} from '../mock/const.js';
import {isFutureDate, isPastDate} from './date-utils.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureDate(point.dateFrom, point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastDate(point.dateTo)),
};

export {filter};
