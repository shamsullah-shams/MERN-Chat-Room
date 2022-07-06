import {
    makeStyles,
    Button,
} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
    buttonOFForm: {
        marginTop: 20,
        width: '90%',
        marginLeft: 12,
        backgroundColor: "blue",
        color: "white",
    },
}))

const ButtonField = (props) => {
    const classes = useStyle();
    return (
        <React.Fragment>
            <Button
                className={classes.buttonOFForm}
                variant="contained"
                onClick={props.onClick}>
                {props.children}
            </Button>
        </React.Fragment>
    )
}

export default ButtonField;