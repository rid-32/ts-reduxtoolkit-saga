import { reducer as sellersReducerMap } from './sellers';
import { reducer as producersReducerMap } from './producers';

export default {
  ...sellersReducerMap,
  ...producersReducerMap,
};
