import { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import { Drawer, LinearProgress, Grid, Badge } from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import "./App.css";
import Item from "./components/Item";
import Cart from "./components/Cart";

export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
};

function App() {  
  const [isLoading, setIsLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [Items, setItems] = useState<CartItemType[] | []>([]);
  const [cartItems, setCartItems] = useState<CartItemType[] | []>([]);
  
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      const loadedData: CartItemType[] = data;
      setItems(loadedData);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    
    setCartItems((prev:CartItemType[]) =>
      prev.reduce((ack :CartItemType[] | [] , item :CartItemType) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;

  return (
    <div className="w-5/6 mx-auto my-20">
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddToCart={handleAddToCart}
        />
      </Drawer>
      <div className=" top-5 right-5 z-50 fixed">
        <IconButton onClick={() => setCartOpen(true)}>
          <Badge
            badgeContent={getTotalItems(cartItems)}
            className="text-red-800"
          >
            <AddShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </div>
      <Grid container spacing={2}>
        {Items?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
