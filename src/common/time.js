import moment from 'moment/moment'
export default {
  name: 'TIME',
  year: moment().year(),
  month: moment().month(),
  date: moment().date(),
  hour: moment().hour(),
  minute: moment().minute()
}