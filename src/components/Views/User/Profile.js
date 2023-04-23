import React from "react";
import "../User/css/profile.css";
import { AuthContext } from "../../../contexts/AuthContext";

// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import axios from "axios";
import { lazy, memo, Suspense, useCallback, useContext, useEffect, useState } from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/layouts/Loading";
import { showToast } from "../../../redux/actions";
import { updateUser } from "../../../redux/actions/user-profile";
import { toast$ } from "../../../redux/selectors/";
// import * as L from "leaflet/dist/leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet.icon.glyph";
import { apiUrl } from "../../../constants";
import Swal from "sweetalert2";
// import RoomIcon from "@mui/icons-material/Room";

const AlertMessage = lazy(() => import("../../../components/layouts/AlertMessage"));
const Profile = () => {
    const {
        authState: { user, isAuthenticated, authLoading },
        loadUser,
    } = useContext(AuthContext);

    let dateString = "";
    if (user) {
        console.log(user);
        const isoTimestamp = user?.data?.birthday.toString();
        dateString = isoTimestamp.substring(0, 10);
    }
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const toast = useSelector(toast$);
    const [alert, setAlert] = useState(null);
    const [newInfo, setNewInfo] = useState({
        email: "",
        fullName: "",
        gender: "",
        birthday: "",
        phone: "",
        address: "",
    });

    const { email, fullName, gender, birthday, phone, address } = newInfo;
    const [isDisableSubmit, setIsDisableSubmit] = useState(true);
    if (!authLoading && !isAuthenticated) {
        navigate(`/login?RedirectTo=${location.pathname}${location.search}`);
    }

    const clearData = useCallback(() => {
        setNewInfo({
            email: user?.data?.email || "",
            fullName: user?.data?.fullName || "",
            gender: user?.data?.gender || "",
            birthday: dateString || "",
            phone: user?.data?.phone || "",
            address: user?.data?.address || "",
        });
    }, [user?.data?.address, user?.data?.fullName, user?.data?.phone, user?.data?.gender]);

    // useEffect(() => {
    //     if (user) {
    //         setNewInfo({ fullName: user?.data.fullName });
    //     }
    // }, [user]);

    useEffect(
        () => async () => {
            await loadUser();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [authLoading],
    );

    useEffect(() => {
        clearData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadUser]);

    const onChangeData = useCallback(
        (event) => {
            setNewInfo({ ...newInfo, [event.target.name]: event.target.value });
            setIsDisableSubmit(false);
            console.log(newInfo);
            console.log();
        },
        [newInfo],
    );

    const onSubmit = useCallback(
        (event) => {
            console.log("okeeee");
            event.preventDefault();

            if (
                fullName === user?.data.fullName &&
                phone === user?.data.phone &&
                address === user?.data.address
            ) {
                console.log("nothing change");
                setIsDisableSubmit(false);
                return;
            }
            if (!fullName || !phone) {
                setIsDisableSubmit(false);
                setAlert({
                    type: "warning",
                    message: "completeInfo",
                });
                setTimeout(() => setAlert(null), 5000);
                return;
            }
            setAlert(null);
            newInfo.birthday = birthday.toString() + "T00:00:00.000Z";

            dispatch(
                updateUser.updateUserRequest({
                    ...newInfo,
                    isActive: true,
                }),
            );
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                window.location.reload(true);
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            address,
            dispatch,
            fullName,
            newInfo,
            phone,
            toast?.type,
            user?.address,
            user?.fullName,
            user?.id,
            user?.phone,
        ],
    );

    return (
        <>
            <div
                style={{
                    background:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../img/page-header.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    paddingBottom: "40px",
                }}
            >
                <div className="page-header" style={{ padding: "65px", background: "unset" }}>
                    <div className="container">
                        <div className="row"></div>
                    </div>
                </div>
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div
                            className="col-md-3 border-right"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <div
                                    id="avatar"
                                    style={{
                                        background: `url(${user?.data.avatar}) `,
                                    }}
                                ></div>

                                <span> </span>
                            </div>
                        </div>
                        <div className="col-md-5 border-right">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                }}
                            >
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">My Profile</h4>
                                    </div>
                                    <div className="row mt-3">
                                        {alert && (
                                            <Suspense fallback={<Loading />}>
                                                <AlertMessage info={alert} />
                                            </Suspense>
                                        )}
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <label className="labels">Fullname</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="fullName"
                                                value={fullName}
                                                onChange={onChangeData}
                                            />
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <label className="labels">Email</label>
                                            <input
                                                disabled
                                                type="email"
                                                className="form-control"
                                                value={email}
                                            />
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <label className="labels">PhoneNumber</label>
                                            <input
                                                type="text"
                                                maxLength={10}
                                                className="form-control"
                                                name="phone"
                                                value={phone}
                                                onChange={onChangeData}
                                            />
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <label className="labels">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                value={address}
                                                onChange={onChangeData}
                                            />
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <label className="labels">Birthday</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="birthday"
                                                value={birthday}
                                                onChange={onChangeData}
                                            />
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <label className="labels">Gender</label>
                                            <select
                                                name="gender"
                                                id="gender"
                                                style={{ borderRadius: 10, padding: 3 }}
                                                value={gender}
                                                onChange={onChangeData}
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="unknown">Unknown </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-5 text-center">
                                        <button
                                            onClick={onSubmit}
                                            className="btn btn-primary profile-button"
                                            type="button"
                                            disabled={isDisableSubmit}
                                        >
                                            Save Profile
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center experience">
                                    <span>Edit Experience</span>
                                    <span className="border px-3 p-1 add-experience">
                                        <i className="fa fa-plus" />
                                        &nbsp;Experience
                                    </span>
                                </div>
                                <br />
                                <div className="col-md-12">
                                    <label className="labels">Experience in Designing</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="experience"
                                        defaultValue=""
                                    />
                                </div>
                                <br />
                                <div className="col-md-12">
                                    <label className="labels">Additional Details</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="additional details"
                                        defaultValue=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
