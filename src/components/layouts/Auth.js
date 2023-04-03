import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import queryString from "query-string";
import { memo, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Image from "../../assets/img/charity.png";
import { AuthContext } from "../../contexts/AuthContext";

const theme = createTheme();

const Auth = () => {
    console.log("test 1");
    const location = useLocation();
    console.log(location);

    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body;
    if (authLoading) {
        body = (
            <div style={{ margin: "auto" }}>
                <CircularProgress />
            </div>
        );
    } else if (isAuthenticated) {
        console.log(location.search);
        // const { RedirectTo } = queryString.parse(location.search);
        // return <Navigate to={RedirectTo === undefined ? "/home" : RedirectTo} />;
    } else {
        body = <Outlet />;
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Helmet>
                    <title>{`HEPLZ`}</title>
                    <meta property="og:url" content={window.location.href} />
                    <meta property="og:title" content={`HEPLZ`} />
                </Helmet>
                <Paper
                    sx={{
                        position: "absolute",
                        width: "-webkit-fill-available",
                        height: "950px",
                        borderRadius: 0,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundImage: `url(${Image})`,
                    }}
                >
                    <Container component="main" maxWidth="sm">
                        <CssBaseline />
                        <Box
                            sx={{
                                boxShadow: 3,
                                marginTop: 5,
                                padding: 2,
                                borderRadius: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                background: "white",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            {body}
                        </Box>
                    </Container>
                </Paper>
            </ThemeProvider>
        </>
    );
};

export default memo(Auth);
