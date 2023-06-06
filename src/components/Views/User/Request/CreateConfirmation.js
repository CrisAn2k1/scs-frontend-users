import React, { useCallback, useContext, useEffect, useState } from "react";
import Loading from "../../../layouts/Loading";
import { PlusOutlined } from "@ant-design/icons";

import { Modal, Upload } from "antd";

import { apiUrl } from "../../../../constants";
import "../../User/assets/css/profile.css";

import Swal from "sweetalert2";
import { convertFormData } from "../../../../utils/form-data";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const loadPageHome = () => {
    window.location.href = window.location.href.replace(window.location.href.split("/")[3], "");
};

const CreateConfirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        authState: { user, authLoading, isAuthenticated },
        loadUser,
    } = useContext(AuthContext);

    if (!authLoading && !isAuthenticated) {
        navigate(`/login?redirectTo=${location.pathname}${location.search}`);
    }

    const [fileList, setFileList] = useState([]);

    const [disableButtonCreateMaterialDonation, setDisableButtonCreateMaterialDonation] =
        useState(false);

    const [createMaterialDonationForm, setCreateMaterialDonationForm] = useState({
        address: "",
        description: "",
        images: null,
        userId: user?.data?.id,
        isAnonymous: false,
    });

    const { address, description, isAnonymous } = createMaterialDonationForm;
    const clearData = useCallback(() => {
        setCreateMaterialDonationForm({
            userId: user?.data?.id || null,
            address: createMaterialDonationForm.address || "",
            description: createMaterialDonationForm.description || "",
            images: createMaterialDonationForm.images || null,
            isAnonymous: createMaterialDonationForm.isAnonymous || false,
        });
    }, [user?.data?.id]);

    useEffect(() => {
        clearData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadUser]);

    useEffect(() => {
        if (address?.length > 20 && fileList?.length >= 1) {
            setDisableButtonCreateMaterialDonation(false);
        } else {
            setDisableButtonCreateMaterialDonation(true);
        }
    }, [createMaterialDonationForm, fileList]);

    const onChangeCreateMaterialDonationForm = useCallback(
        (event) => {
            if (event.target.name == "isAnonymous") {
                event.target.value = event.target.value == "false" ? true : false;
            }

            setCreateMaterialDonationForm({
                ...createMaterialDonationForm,
                [event.target.name]: event.target.value,
            });
        },
        [createMaterialDonationForm],
    );
    const [isLoading, setIsLoading] = useState();

    const onSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            if (!user?.data?.id) {
                Swal.fire({
                    position: "top-center",
                    icon: "warning",
                    title: "Warning",
                    text: "Vui lòng đăng nhập và thử lại!",
                    showConfirmButton: true,
                    timer: 5000,
                });

                return;
            }
            setIsLoading(true);

            try {
                const res = await axios.post(
                    apiUrl + "/material-donations",
                    convertFormData(createMaterialDonationForm),
                );
                if (res?.data) {
                    setIsLoading(false);

                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Đã gửi yêu cầu quyên góp thành công!",
                        html: `<div>
                                    Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
                                    <br />
                                    <hr />
                                    Hoặc bạn có thể liên hệ qua:
                                    <div
                                        style="display: flex;
                                            justify-content: center;
                                            padding: 5px 100px;
                                            flex-direction: column;
                                            align-items: flex-start;"
                                    >
                                        <p>
                                            <i class="bi bi-dot"></i> <i class="bi bi-facebook"></i> Facebook:
                                            <a
                                                style="color: blue; font-style: italic;font-weight: bold;"
                                                href="https://www.facebook.com/CrisAn.2001"
                                            >
                                                SCS - HELPZ
                                            </a>
                                        </p>
                                        <p>
                                            <i class="bi bi-dot"></i> <i class="bi bi-telephone-inbound-fill"></i> Phone:
                                            <a
                                                href="tel:0335183057"
                                                style="color: blue; font-style: italic;font-weight: bold;"
                                            >
                                                0335.183.057
                                            </a>
                                        </p>
                                    </div>
                                </div>`,
                        showConfirmButton: true,
                        timer: 10000,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            loadPageHome();
                        }
                    });
                    setTimeout(() => loadPageHome(), 5000);

                    return;
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "error",
                    text: "Có lỗi xảy ra, vui lòng thử lại sau!",
                    showConfirmButton: true,
                    timer: 5000,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(true);
                    }
                });
                setTimeout(() => window.location.reload(true), 5000);

                return;
            }
        },
        [createMaterialDonationForm, address, description, isAnonymous],
    );

    // Upload img
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    // const [previewTitle, setPreviewTitle] = useState("");

    // console.log(fileList);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        //  setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        createMaterialDonationForm.images = newFileList;

        //console.log(createMaterialDonationForm);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Thêm Ảnh
            </div>
        </div>
    );

    const handleRemove = async (_file) => {
        console.log(_file);

        const isConfirmDelete = await new Promise((resolve, _reject) => {
            Swal.fire({
                title: "Xóa minh chứng?",
                text: "Bạn có chắc xóa minh chứng này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Xóa",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve(true);
                }
            });
        });

        return isConfirmDelete ? true : false;
    };

    const showDetialAnonymous = () => {
        Swal.fire({
            position: "top-center",
            icon: "info",
            title: "Quyên Góp Ẩn Danh?",
            html: `<div class="detail-info-anonymous" style="text-align: justify;text-indent: 20px;">Khi bạn chọn chế độ <strong>"Quyên Góp Ẩn Danh"</strong> thì mọi người sẽ không biết bất kỳ thông tin nào về bạn trong danh sách những người quyên góp.</div>`,
            showClass: {
                popup: "animated fadeInDown faster",
                icon: "animated heartBeat delay-1s",
            },
            hideClass: {
                popup: "animated fadeOutDown faster",
            },
        });
    };

    // End Upload Img

    useEffect(() => {
        const interval = setInterval(() => {
            try {
                const list = Array.from(document.getElementsByClassName("ant-tooltip"));

                list.forEach((item) => {
                    item.innerHTML = null;
                });
            } catch (error) {}
            Array.from(document.getElementsByClassName("ant-upload-list-item")).forEach((item) => {
                item.style = "border-color:#18d2d7";
            });
        }, 10);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Loading hidden={!isLoading} />
            <div
                style={{
                    background:
                        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(../img/page-header.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    paddingBottom: "40px",
                }}
                className="profile"
            >
                <div className="page-header" style={{ padding: "65px", background: "unset" }}>
                    <div className="container">
                        <div className="row"></div>
                    </div>
                </div>
                <div
                    className="container rounded bg-white mt-5 mb-5"
                    style={{
                        fontFamily: `'Muli',sans-serif,"Comic Sans MS", "Poppins-Regular", "Arial", "Times"`,
                    }}
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <div className="row">
                            <div className="col-md-12 ">
                                <div style={{ padding: "50px 150px" }}>
                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                        <h4 className="text-right" style={{ fontWeight: 550 }}>
                                            Thông Tin Nhận Nguyên Liệu
                                        </h4>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <div className="row" style={{ minWidth: "600px" }}>
                                                <div className="col-2">
                                                    <label className="label-info-user">
                                                        Họ Tên:
                                                    </label>

                                                    <label className="label-info-user">SĐT:</label>

                                                    <label className="label-info-user">
                                                        Địa Chỉ:
                                                    </label>

                                                    <label className="label-info-user">
                                                        Email:
                                                    </label>
                                                </div>
                                                <div className="col-10">
                                                    <label className="info-user-charity-call">
                                                        {user?.data?.fullName}
                                                    </label>
                                                    <label className="info-user-charity-call">
                                                        {user?.data?.phone}
                                                    </label>

                                                    <label className="info-user-charity-call">
                                                        {user?.data?.address}
                                                    </label>

                                                    <label className="info-user-charity-call">
                                                        {user?.data?.email}
                                                    </label>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <strong style={{ color: "red", fontSize: 15 }}>
                                                Bạn Muốn Nhận Nguyên Liệu Nào?
                                            </strong>
                                            <br />
                                            <br />
                                            <div>
                                                <span>Cà Rốt: &ensp; &ensp; </span>
                                                <input
                                                    type="text"
                                                    style={{ textAlign: "right", width: "100px" }}
                                                    value={0}
                                                />
                                                {"    "}
                                                kg
                                            </div>
                                            <br />
                                            <div>
                                                <span>Bắp Cải: &ensp;&ensp;</span>
                                                <input
                                                    type="text"
                                                    style={{ textAlign: "right", width: "100px" }}
                                                    value={0}
                                                />{" "}
                                                kg
                                            </div>
                                            <br />

                                            <div>
                                                <span>Bắp: &ensp; &ensp; &ensp; &ensp;</span>
                                                <input
                                                    type="text"
                                                    style={{ textAlign: "right", width: "100px" }}
                                                    value={0}
                                                />{" "}
                                                trái
                                            </div>
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <label className="labels">
                                                <strong style={{ color: "red", fontSize: 15 }}>
                                                    Mô tả
                                                </strong>
                                                <br></br>
                                                <p className="attention">
                                                    Hãy để lại một vài dòng nêu rõ lý do bạn muốn
                                                    nhận nguyên liệu nhé!
                                                </p>
                                            </label>

                                            <textarea
                                                style={{
                                                    textAlign: "left",
                                                    height: 75,
                                                    maxHeight: 200,
                                                    minHeight: 75,
                                                }}
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                value={description}
                                                onChange={onChangeCreateMaterialDonationForm}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 text-center">
                                        <button
                                            onClick={onSubmit}
                                            className="btn btn-primary profile-button"
                                            type="button"
                                            disabled={disableButtonCreateMaterialDonation}
                                        >
                                            Gửi Yêu Cầu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateConfirmation;
