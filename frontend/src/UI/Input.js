import {
    TextField,
    makeStyles
} from "@material-ui/core";
import { useStyle } from "./Style";

const Input = (props) => {
    const classes = useStyle();
    return (
        <TextField
            required
            id="outlined-name-required"
            label={props.label}
            variant="outlined"
            className={classes.inputField}
            type={props.type}
        />
    )
}


export default Input;