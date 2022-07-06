
import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: 30,
        width: 400,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingLeft: 3,
    },
    ButtonLinkClass: {
        textDecoration: 'none',
        color: "white",
        width: '100%',
        marginLeft: 22
    }
}));
