import { TrendObjExtApi } from '../../extdatarouter/interfaces/ext.interface';

export interface TrendObjApi extends TrendObjExtApi {
  totalvolume: number;
  totalvolumePrev: number;
  diff2: number;
  diff3: number;
  diff5: number;
  diff10: number;
  subscriptions: number;
}
