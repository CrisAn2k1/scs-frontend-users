import Alert from "@mui/material/Alert";

const AlertMessage = ({ info }) => {
    return info === null || info?.type === "success" ? null : (
        <Alert style={{ marginBottom: "10px" }} severity={info.type}>
            {info.message}
        </Alert>
    );
};

export default AlertMessage;
