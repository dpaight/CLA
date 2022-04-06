const {dayjs} = Dayjs;

const testDayjs = () => console.log(
    dayjs()
    .startOf('month')
    .add(1, 'day')
    .set('year', 2018)
    .format('YYYY-MM-DD HH:mm:ss')
);