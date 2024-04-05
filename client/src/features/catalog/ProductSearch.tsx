import { Button, TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';


export default function ProductSearch() {
    const {productParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce(() => {
        dispatch(setProductParams({ searchTerm }))
    }, 500)

    return (
        <div>
        <TextField
        label='Search products'
        variant="outlined"
        fullWidth
        value={searchTerm || ''}
        onChange={(event) => setSearchTerm(event.target.value)}

        />

        <Button variant="outlined" sx={{mb: 2}} startIcon={<SearchIcon />} onClick={() => {
            debouncedSearch()
        }}>
            Search
        </Button>
    </div>
        
    )
}