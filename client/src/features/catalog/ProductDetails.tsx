import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => {
        if (typeof id === 'string') {
            return productSelectors.selectById(state, parseInt(id));
        }
        // Handle the case where id is not a number
        return null; // Or any other appropriate handling
    });
    const {status: productStatus} = useAppSelector(state => state.catalog)
    const [amount, setAmount] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);


    useEffect(() => {
        if (typeof id === 'string') {
            if (item) setAmount(item.amount);
            if (!product) dispatch(fetchProductAsync(parseInt(id)))
        }
    }, [id, item, product, dispatch])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (parseInt(event.currentTarget.value) >= 0) {
            setAmount(parseInt(event.currentTarget.value));
        }
    }

    function handleUpdateCart() {
        if (!product) return;
        if (!item || amount > item.amount) {
            const updatedAmount = item ? amount - item.amount : amount;
            dispatch(addBasketItemAsync({productId: product.id, amount: updatedAmount}))
        } else {
            const updatedAmount = item.amount - amount;
            dispatch(removeBasketItemAsync({productId: product.id, amount: updatedAmount}))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message="Loading product..." />

    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.imageUrl} alt={product.name} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>
                    {product.name}
                </Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant='h4' color='#9E9E9E'>
                    ${product.price.toFixed(2)}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell> Name </TableCell> 
                                <TableCell> {product.name} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Description </TableCell> 
                                <TableCell> {product.description} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Type </TableCell> 
                                <TableCell> {product.type} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Brand </TableCell> 
                                <TableCell> {product.brand} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Amount in Stock </TableCell> 
                                <TableCell> {product.amountInStock} </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            label='Amount in Cart'
                            fullWidth
                            value={amount}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.amount === amount || !item && amount === 0}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant="contained"
                            fullWidth
                        >
                            {item ? 'Update Amount' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}