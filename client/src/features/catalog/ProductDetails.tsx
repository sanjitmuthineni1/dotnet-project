import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import agent from "../../app/api/agent";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../app/models/product";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const {basket, setBasket, removeItem} = useStoreContext();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);


    useEffect(() => {
        if (item) setAmount(item.amount);
        id && agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id, item])

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (parseInt(event.currentTarget.value) >= 0) {
            setAmount(parseInt(event.currentTarget.value));
        }
    }

    function handleUpdateCart() {
        if (!product) return;
        setSubmitting(true);
        if (!item || amount > item.amount) {
            const updatedAmount = item ? amount - item.amount : amount;
            agent.Basket.addItem(product.id, updatedAmount)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        } else {
            const updatedAmount = item.amount - amount;
            agent.Basket.removeItem(product.id, updatedAmount)
                .then(() => removeItem(product.id, updatedAmount))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        }
    }

    if (loading) return <LoadingComponent message="Loading product..." />

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
                            loading={submitting}
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