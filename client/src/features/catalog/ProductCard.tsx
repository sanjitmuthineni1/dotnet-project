import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
  const {status} = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch();

  // function handleAddItem(productId: number) {
  //   setLoading(true);
  //   agent.Basket.addItem(productId)
  //         .then(basket => dispatch(setBasket(basket)))
  //         .catch(error => console.log(error))
  //         .finally(() => setLoading(false));

  // }
  return (
    <Card>
      <CardHeader
          title={product.name}
          titleTypographyProps={{
              sx: {fontWeight: 'bold'}
          }}
      />
      <CardMedia
        sx={{ height: 200 }}
        image={product.imageUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={status.includes('pendingAddItem' + product.id)}
        onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
        size="small">Add to cart</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
    )
}