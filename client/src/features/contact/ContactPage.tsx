import { ButtonGroup, Typography, Button } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
    const dispatch = useAppDispatch();
    const {data, title} = useAppSelector(state => state.counter);
    // const title = useSelector((state: CounterState) => state.title);
    return (
        <>
        <Typography variant="h5">
            {title} is {data}
        </Typography>
        <ButtonGroup>
            <Button onClick={() => dispatch(increment(1))}>Up</Button>
            <Button onClick={() => dispatch(decrement(1))}>Down</Button>
            <Button onClick={() => dispatch(increment(5))}>Up by 5</Button>
        </ButtonGroup>
        </>
    )
}