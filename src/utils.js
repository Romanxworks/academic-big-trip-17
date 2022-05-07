import dayjs from 'dayjs';


const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('H:mm');
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
