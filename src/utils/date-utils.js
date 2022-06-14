import dayjs from 'dayjs';
import {getRandomInteger} from './random-data-utils.js';
const humanizePointDate = (date) => dayjs(date).format('H:mm');

const pointDateAddEdit = (date) => dayjs(date).format('DD/MM/YY H:mm');

const getTimeDifference = (dateFrom, dateTo)=>{
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const differenceToMinute  = Number(end.diff(start,'m',true).toFixed());
  const differenceToHour = Number(end.diff(start,'h',true).toFixed());
  const differenceToDay = Number(end.diff(start,'d',true).toFixed());
  let result = `${differenceToMinute}M`;
  if(differenceToMinute >= 60){
    result = `${differenceToHour<= 9? `0${differenceToHour}`:differenceToHour}H ${differenceToMinute%60 <= 9? `0${differenceToMinute%60}`:differenceToMinute%60}M`;
  }
  if(differenceToHour>=24){
    result = `${differenceToDay}D ${differenceToHour%24<= 9? `0${differenceToHour%24}`:differenceToHour%24}H ${differenceToMinute%60 <= 9? `0${differenceToMinute%60}`:differenceToMinute%60}M`;
  }
  return result;
};

const generateDate = (gapType) => {

  const maxGap = getRandomInteger(3,10);
  const gap = getRandomInteger(-maxGap, maxGap);

  return dayjs().add(gap, gapType).toISOString();
};

const isFutureDate = (dateFrom, dateTo) => dayjs().isBefore(dayjs(dateFrom))||dayjs().isSame(dayjs(dateFrom))||dayjs().isBefore(dayjs(dateTo));

const isPastDate = (date) => dayjs().isAfter(dayjs(date));

export {humanizePointDate, getTimeDifference, generateDate, pointDateAddEdit, isFutureDate, isPastDate};
