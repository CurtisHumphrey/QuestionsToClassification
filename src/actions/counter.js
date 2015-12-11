import { COUNTER_INCREMENT, CHART_INCREMENT } from 'constants/counter';

export default {
  increment: () => ({ type : COUNTER_INCREMENT }),
  chart: () => ({ type : CHART_INCREMENT })
};
