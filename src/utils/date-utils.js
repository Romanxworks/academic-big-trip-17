import dayjs from 'dayjs';
import {PointDifferenceTime} from '../const.js';

const humanizePointDate = (date) => dayjs(date).format('H:mm');

const pointDateAddEdit = (date) => dayjs(date).format('DD/MM/YY H:mm');

const getTimeDifference = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const differenceToMinute  = Number(end.diff(start,'m',true).toFixed());
  const differenceToHour = Number(end.diff(start,'h',true).toFixed());
  const differenceToDay = Number(end.diff(start,'d',true).toFixed());
  let result = `${differenceToMinute}M`;
  if(differenceToMinute >= PointDifferenceTime.MINUTE){
    result = `${differenceToHour<= PointDifferenceTime.HOUR? `0${differenceToHour}`:differenceToHour}H ${differenceToMinute%PointDifferenceTime.MINUTE <= PointDifferenceTime.HOUR? `0${differenceToMinute%PointDifferenceTime.MINUTE}`:differenceToMinute%PointDifferenceTime.MINUTE}M`;
  }
  if(differenceToHour>=PointDifferenceTime.DAY){
    result = `${differenceToDay}D ${differenceToHour%PointDifferenceTime.DAY<= PointDifferenceTime.HOUR? `0${differenceToHour%PointDifferenceTime.DAY}`:differenceToHour%PointDifferenceTime.DAY}H ${differenceToMinute%PointDifferenceTime.MINUTE <= PointDifferenceTime.HOUR? `0${differenceToMinute%PointDifferenceTime.MINUTE}`:differenceToMinute%PointDifferenceTime.MINUTE}M`;
  }
  return result;
};

const isFutureDate = (dateFrom, dateTo) => dayjs().isBefore(dayjs(dateFrom))||dayjs().isSame(dayjs(dateFrom))||dayjs().isBefore(dayjs(dateTo));

const isPastDate = (date) => dayjs().isAfter(dayjs(date));

const getDestinationByName = (destinations, name) => {
  if(name){
    return destinations.find((destination) => destination.name === name);
  }
  return null;
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {humanizePointDate, getTimeDifference, pointDateAddEdit, isFutureDate, isPastDate, getDestinationByName, isEscapeKey};
