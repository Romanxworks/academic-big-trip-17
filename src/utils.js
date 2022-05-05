import dayjs from 'dayjs';

const humanizePointDueDate = (dueDate) => dayjs(dueDate).format('H:mm');
const getTimeDifference = (dateFrom, dateTo)=>{
  const duration = dayjs(dateTo).diff(dayjs(dateFrom),'minutes');
  //   duration = duration = dayjs(dateTo).diff(dayjs(dateFrom),'m');

  //   if(duration>60){
  //     duration = dayjs(dateTo).diff(dayjs(dateFrom),'h');
  //     if(duration>24){
  //       duration = dayjs(dateTo).diff(dayjs(dateFrom),'d');
  //     }
  //   }
  return duration;
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
