import dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('H:mm');
const getTimeDifference = (dateFrom, dateTo)=>{
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const diff = Number(end.diff(start,'m',true).toFixed());
  const diffH = Number(end.diff(start,'h',true).toFixed());
  const diffD = Number(end.diff(start,'d',true).toFixed());
  let result = `${diff}M`;
  if(diff >= 60){
    result = `${diffH}H ${diff%60}M`;
  }
  if(diffH>=24){
    result = `${diffD}D ${diffH%24}H ${diff%60}M`;
  }
  //   const difference = dayjs.duration(end.diff(start)).format('DD/HH/mm').split('/');
  //   let result = `${difference[0]}D ${difference[1]}H ${difference[2]}M`;
  //   if(difference[0] === '00'){
  //     result = `${difference[1]}H ${difference[2]}M`;
  //     if(difference[1] === '00'){
  //       result = `${difference[2]}M`;
  //     }
  //   }

  return result;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomData = (data) => {
  const randomIndex = getRandomInteger(0, data.length - 1);

  return data[randomIndex];
};

export {getRandomInteger, humanizePointDueDate, getTimeDifference, generateRandomData};
