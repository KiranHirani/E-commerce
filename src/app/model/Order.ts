import { ShoppingCartItem } from './ShoppingCartItem';
import { ShoppingCart } from './ShoppingCart';

export class Order
{
    dateCreated:number;
    items:any[]=[];
    array:any[]=[];

    constructor(public userId?:string, public shipping?:any,shoppingCart?:ShoppingCart)
    {
        this.dateCreated=new Date().getTime();
        this.items=Object.entries(shoppingCart.items).map(x=> 
            {
              return {
                product:{
                title:x[1].title,
                price:x[1].price,
                imageUrl:x[1].imageUrl
                },
                quantity:x[1].quantity,
                totalPrice:x[1].price*x[1].quantity
              }
            })
    }
}

//Used Object.entries to convert an object into array, 
// we can use map operator only in an array, 