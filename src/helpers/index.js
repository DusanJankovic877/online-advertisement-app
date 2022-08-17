import moment from 'moment'
export const formatTime  = (createdAt) => {
  return moment().format('MMMM Do YYYY, h:mm:ss a', createdAt);
}
