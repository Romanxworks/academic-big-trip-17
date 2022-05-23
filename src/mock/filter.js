import {filter} from '../utils/filter.js';

export const generateFilter = (points) => Object.entries(filter).map(
  ([filterName, filterPoint]) => ({
    name: filterName,
    count: filterPoint(points),
  }),
);
