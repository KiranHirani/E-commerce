import { Product } from './Product';
export class ShoppingCartItem {

    totalPrice: number;

    constructor
        (
            public key?: string,
            public title?: string,
            public price?: number,
            public quantity?: number,
            public imageUrl?: string,
            public category?: string,
        ) {
            
    }
   get tPrice()
   {
       return this.price*this.quantity;
   }
    

}
// init?:Partial<ShoppingCartItem>