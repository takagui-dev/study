export interface IProduct {
  id: number;
  title: string;
  price: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
  failureStockCheck: number[];
}

export interface IStockResponse {
  id: number;
  quantity: number;
}
