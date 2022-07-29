import {paginateActionTypes} from '../actions/sample/paginateSample';

const defaultState = {
  loading: false,
  samples: []
};

export default function(state = defaultState, action) {
  const {type, payload} = action;
  switch (type) {
    case paginateActionTypes.PAGINATE_SAMPLES:
      return {loading: true};
    case paginateActionTypes.PAGINATE_SAMPLES_SUCCEED:
      return {loading: false, samples: payload};
    case paginateActionTypes.PAGINATE_SAMPLES_FAILED:
      return {loading: false};
    default:
      return state;
  }
}
