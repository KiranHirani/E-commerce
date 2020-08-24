export class Product
{
    key:string;
    title:string;
    price:number;
    category:string;
    imageUrl:string;
    quantity:number

    constructor()
    {
        this.quantity=0;
        this.key='';
    }
}