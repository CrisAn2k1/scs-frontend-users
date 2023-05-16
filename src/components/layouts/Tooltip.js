import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { hideToast } from "../../redux/actions";

const Tooltip = ({ toast }) => {
    const dispatch = useDispatch();

    const handleClose = useCallback(
        (event, reason) => {
            if (reason === "clickaway") {
                return;
            }
            dispatch(hideToast());
        },
        [dispatch],
    );
    console.log("test");
    console.log(toast);
    return (
        <Snackbar
            open={toast.show}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={toast.type}
                sx={{ width: "100%" }}
            >
                {toast.message}
            </MuiAlert>
        </Snackbar>
    );
};

export default memo(Tooltip);
