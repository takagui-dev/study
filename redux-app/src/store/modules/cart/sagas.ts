import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess
} from './actions';
import { IState } from '../../../store';
import { ActionTypes, IStockResponse } from './types';
import api from '../../../services/api';

type checkProductStockRequest = ReturnType<typeof addProductToCartRequest>;

function* checkProductStock({ payload }: checkProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
    const items = state.cart.items;

    return items.find(item =>
        item.product.id === product.id
      )?.quantity ?? 0;
  });

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
]);
