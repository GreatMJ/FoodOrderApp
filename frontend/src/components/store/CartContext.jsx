import { act, createContext, useReducer } from "react";



const CartContext=createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{}
})

// reducer funciton
const cartReducer=(state,action)=>{
    if(action.type==='ADD_ITEM'){
      const existingItemIndex=state.items.findIndex((item)=>item.id===action.item.id);   // check weather item already present or not

      // create new array for updated items
      const updatedItems=[...state.items];

      if(existingItemIndex>-1){                  // item already exist
        const existingItem=state.items[existingItemIndex];

        const updatedItem={...existingItem, quantity: existingItem.quantity+1};

        updatedItems[existingItemIndex]=updatedItem;
      }else{                                  // item newly adding in the cart
          updatedItems.push({...action.item,quantity:1});
      }
      // return the updated state
      return {...state,items:updatedItems}

    }


    if(action.type==='REMOVE_ITEM'){
        const existingItemIndex=state.items.findIndex((item)=>item.id===action.id);     // get the index of item to be deleted

        const updatedItems=[...state.items];

        if(existingItemIndex.quantity===1){
            updatedItems.splice(existingItemIndex,1);             // remove item from the cart
        }else{
        const existingItem=state.items[existingItemIndex];
           const updatedItem={ ...existingItem, quantity:existingItem.quantity-1 };
           updatedItems[existingItemIndex]=updatedItem;
        }
        return {...state,items:updatedItems};
    }

    return state;
}

// wrapper
export function CartContextProvider({children}){

    // state management using useReducer
   const [cart,dispatchCartAction]= useReducer(cartReducer,{items:[]});

   // to add item
   const addItem=(item)=>{ dispatchCartAction({type:'ADD_ITEM', item})};

   // to remove item
   const removeItem=(id)=>{dispatchCartAction({type:'REMOVE_ITEM', id})};

   const cartContext={
    items: cart.items,
    addItem,
    removeItem
   }

   console.log(cartContext);
   
    return<CartContext.Provider value={cartContext}>{children}</CartContext.Provider> 
}

export default CartContext;