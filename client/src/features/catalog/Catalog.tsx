
import ProductList from "../catalog/ProductList";
import ProductSearch from "../catalog/ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to Low'},
    {value: 'price', label: 'Price - Low to High'},
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const {productsLoaded, filtersLoaded, brands, types, productParams, metaData} = useAppSelector(state => state.catalog)

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])

    if (!filtersLoaded) return <LoadingComponent message="Loading our products..."/>
    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>

                    <ProductSearch />

                <Paper sx={{mb: 2, p: 2}}>
                    <RadioButtonGroup
                     selectedValue={productParams.orderBy}
                     options={sortOptions}
                     onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
                     />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButtons 
                    items={brands}
                    checked={productParams.brands}
                    onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButtons 
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products}/>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb: 2, mt: 2}}>
                {metaData &&
                <AppPagination
                metaData={metaData}
                onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                />
}
            </Grid>
        </Grid>
    )
}