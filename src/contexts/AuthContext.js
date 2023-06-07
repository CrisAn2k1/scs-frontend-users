// import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { apiUrl, LOAD_SUCCESS, LOCAL_STORAGE_TOKEN_NAME } from "../constants";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const loadLoginPage = () => {
    window.location.href =
        process.env.NODE_ENV !== "production"
            ? "http://localhost:5000/login"
            : "https://scs-helpz.netlify.app/login";
};

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        userActivity: null,
        isCallingCharity: false,
        isDonatingMaterial: false,
        isLoveKitchen: false,
    });

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);

            try {
                const response = await axios.get(`${apiUrl}/auth/profiles`);
                if (response?.data.data) {
                    const moreRes = await axios.post(`${apiUrl}/users/${response.data.data.id}`, {
                        select: {
                            charityCalls: true,
                            moneyDonations: true,
                            materialDonations: true,
                        },
                    });

                    moreRes?.data?.data?.charityCalls.forEach((item) => {
                        if (item.status !== "approved") {
                            authState.isCallingCharity = true;
                        }
                    });

                    moreRes?.data?.data?.materialDonations.forEach((item) => {
                        if (item.status !== "approved") {
                            authState.isDonatingMaterial = true;
                        }
                    });

                    response?.data?.data?.roles.forEach((item) => {
                        if (item.id === 3) {
                            authState.isLoveKitchen = true;
                        }
                    });

                    dispatch({
                        type: LOAD_SUCCESS,
                        payload: {
                            isAuthenticated: true,
                            user: response?.data,
                            userActivity: moreRes.data?.data,
                            isCallingCharity: authState.isCallingCharity,
                            isDonatingMaterial: authState.isCallingCharity,
                            isLoveKitchen: authState.isLoveKitchen,
                        },
                    });
                }
            } catch (error) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                setAuthToken(null);
                dispatch({
                    type: LOAD_SUCCESS,
                    payload: { isAuthenticated: false, user: null },
                });
                if (error.response?.data) return error.response?.data;
                else return { success: false, message: error.message };
            }
        } else {
            setAuthToken(null);
            dispatch({
                type: LOAD_SUCCESS,
                payload: { isAuthenticated: false, user: null },
            });
        }
    };

    useEffect(() => {
        async function handleLoadUser() {
            await loadUser();
        }
        handleLoadUser();
    }, []);

    const loginUser = async (loginForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, loginForm);

            if (response?.data.data.accessToken)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response?.data.data.accessToken);
            await loadUser();

            return response?.data.data;
        } catch (error) {
            console.log(error);
            if (error.response?.data) {
                return error.response?.data;
            } else return { success: false, message: error.message };
        }
    };

    const registerUser = async (registerForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, registerForm);
            console.log(response?.data);
            if (response?.data.data) {
                console.log("check");

                dispatch({
                    type: LOAD_SUCCESS,
                    payload: { user: response?.data },
                });
            }

            return response?.data.data;
        } catch (error) {
            if (error.response?.data) return error.response?.data;
            else return { success: false, message: error.message };
        }
    };

    const verifyUser = async (activeForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/otp`, activeForm);

            return response?.data;
        } catch (error) {
            if (error.response?.data) return error.response?.data.data;
            else return { success: false, message: error.message };
        }
    };

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        dispatch({
            type: LOAD_SUCCESS,
            payload: { isAuthenticated: false, user: null },
        });
        loadLoginPage();
    };

    const sendMailResetPassword = async (email) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/send-mail-reset-password`, { email });
            return response?.data;
        } catch (error) {
            if (error.response?.data) return error.response?.data.data;
            else return { success: false, message: error.message };
        }
    };

    const resetPassword = async (resetPasswordForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/reset-password`, resetPasswordForm);
            console.log(response);
            return response?.data;
        } catch (error) {
            if (error.response?.data) return error.response?.data.data;
            else return { success: false, message: error.message };
        }
    };

    const changePassword = async (changePasswordForm) => {
        try {
            const response = await axios.patch(
                `${apiUrl}/auth/profiles/change-password`,
                changePasswordForm,
            );
            return response?.data;
        } catch (error) {
            if (error.response?.data) return error.response?.data;
            else return { success: false, message: error.message };
        }
    };

    const authContextData = {
        loadUser,
        loginUser,
        registerUser,
        logoutUser,
        authState,
        verifyUser,
        sendMailResetPassword,
        resetPassword,
        changePassword,
    };

    return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
