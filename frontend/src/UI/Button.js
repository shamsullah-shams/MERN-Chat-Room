import {
    makeStyles,
    Button,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    buttonOFForm: {
        marginBottom: 20,
        width: '90%',
        marginLeft: 12,
        backgroundColor: "green",
        color: "white",
    },
}))

const ButtonField = (props) => {
    const classes = useStyle();
    return (
        <Button
            className={classes.buttonOFForm}
            variant="contained"
        >{props.children}</Button>
    )
}

export default ButtonField;