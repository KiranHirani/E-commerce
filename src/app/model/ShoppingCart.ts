import { ShoppingCartItem } from "./ShoppingCartItem";
import { Product } from './Product';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

export class ShoppingCart {
    // item:ShoppingCartItem=new ShoppingCartItem();
    public items: ShoppingCartItem[]=[];
    get totalItemsCount() {
        let count = 0;
        for (let id in this.items) {
            count += this.items[id].quantity;
        }
        return count;
    }

    constructor(public itemsMap?: { [productId: string]: ShoppingCartItem }) 
    {
        this.itemsMap=itemsMap || {};
        for (let productId in this.itemsMap) 
        {
            let item = itemsMap[productId];
            let x=new ShoppingCartItem();
            //To copy the item we get from firebase to thix x, we can do this by using 
            //assign method, it will copy properties from item into x 
            Object.assign(x,item);
            x.key=productId;
            this.items.push(x);
            console.log(this.items);
        }
    }


getQuantity(product:Product)
{
    let item = this.itemsMap[product.key]; //returns a reference to that shopping cart item 
    if (item)
        return item.quantity;
    else
        return 0;
}


//Getting product IDs 

get productIds() {
    return Object.keys(this.items);
    // Here we need keys, so in JS, we can get the keys by calling Object, which is a class 
    // I guess, provides common functionality to all JS objects. we called keys method on this. 
    // and passed an object items, it will fetch the keys of this object and return the array of keys
}


get totalPrice()
{
    let sum=0;
    // console.log(this.items['items']);
    for(let i in this.items)
    {
         sum+=this.items[i].price*this.items[i].quantity;
    }
    return sum;
}

// get totalItemsCount()
// {
//     let count=0;
//    this.items.forEach(item=>{
//       count+=item.quantity;
//    })
//    return count;
// }

}
