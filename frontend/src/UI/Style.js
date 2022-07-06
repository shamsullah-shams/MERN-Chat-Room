import { makeStyles } from "@material-ui/core";

export const useStyle = makeStyles((theme) => ({
    usersCard: {
        maxWidth: 345,
        marginTop: 3,
        border: '1px solid #D3D3D3'
    },
    rootOfHome: {
        flexGrow: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
        padding: 100,
    },
    paperOfHome: {
        height: 450,
        width: 350,
        justifyContent: "center",
        overflow: "auto",
        border: "1px solid #BF00FF"
    },

    controlOfHome: {
        padding: theme.spacing(2),
    },

    inputOfHome: {
        padding: '10px 20px',
        width: '65%'
    },

    buttonOfHome: {
        color: 'white',
        background: 'black',
        border: 'none',
        outline: 'none',
        padding: '10px',
        marginLeft: '3px',
        border: '1px solid black'
    },

    messageDivOfHome: {
        overflow: 'auto',
        height: "95%",
    },
    withPercentOfHome: {
        width: "100%"
    },

    container: {
        margin: 'auto',
        marginTop: 30,
        width: 400,
    },
    inputField: {
        marginBottom: 20,
        width: '90%',
        marginLeft: 12
    }

}));


