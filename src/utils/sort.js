import dayjs from 'dayjs';

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortByTime = (pointA, pointB) =>{
  const diffA = dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo));
  const diffB = dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo));
  return diffB - diffA;
};

const sortByDay = (pointA, pointB) => {
  if(dayjs(pointA.dateFrom).isBefore(dayjs(pointB.dateFrom))){
    return 1;
  }
  if(dayjs(pointA.dateFrom).isAfter(dayjs(pointB.dateFrom))){
    return -1;
  }
  return 0;
};

export {sortByPrice, sortByTime, sortByDay};
