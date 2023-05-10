import React, { Suspense, lazy, useCallback, useContext, useEffect, useState } from "react";
import Loading from "../../layouts/Loading";
import { PlusOutlined } from "@ant-design/icons";

import { Modal, Upload } from "antd";

import { apiUrl } from "../../../constants";
import "../User/css/profile.css";
import Swal from "sweetalert2";
import { convertFormData } from "../../../utils/form-data";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";

const AlertMessage = lazy(() => import("../../../components/layouts/AlertMessage"));

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const CreateCharityCall = () => {
    const {
        authState: { user, authLoading },
        loadUser,
    } = useContext(AuthContext);

    const [fileList, setFileList] = useState([]);

    const [alert, setAlert] = useState(null);

    const [disableCreateCharityCall, setDisableCreateCharityCall] = useState(false);

    const [createCharityCallForm, setCreateCharityCallForm] = useState({
        amountLimit: "",
        description: "",
        proofs: null,
        userId: user?.data?.id,
    });
    const currentDate = new Date().toLocaleDateString() + new Date().getUTCDate();
    console.log(currentDate);

    const clearData = useCallback(() => {
        setCreateCharityCallForm({
            userId: user?.data?.id || null,
        });
    }, [user?.data?.id]);

    useEffect(() => {
        clearData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadUser]);

    const { amountLimit, description } = createCharityCallForm;
    useEffect(() => {
        if (amountLimit == "" || description?.length <= 50) {
            setDisableCreateCharityCall(true);
        } else {
            setDisableCreateCharityCall(false);
        }
        console.log(createCharityCallForm);
    }, [createCharityCallForm]);

    const onChangeCreateCharityCallForm = useCallback(
        (event) => {
            setCreateCharityCallForm({
                ...createCharityCallForm,
                [event.target.name]: event.target.value,
            });
        },
        [createCharityCallForm],
    );

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        const res = await axios.post(
            apiUrl + "/charity-calls",
            convertFormData(createCharityCallForm),
        );
    });

    // Upload img
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    // console.log(fileList);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        createCharityCallForm.proofs = fileList;
        console.log(createCharityCallForm);
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

    // End Upload Img

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
                className="profile"
            >
                <div className="page-header" style={{ padding: "65px", background: "unset" }}>
                    <div className="container">
                        <div className="row"></div>
                    </div>
                </div>
                <div
                    className="container rounded bg-white mt-5 mb-5"
                    style={{ fontFamily: `"Comic Sans MS", "Poppins-Regular", "Arial", "Times"` }}
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <h2 style={{ textAlign: "center", padding: "30px 0" }}>Tạo Lời Kêu Gọi</h2>
                        {alert && (
                            <Suspense fallback={<Loading />}>
                                <AlertMessage info={alert} />
                            </Suspense>
                        )}
                        <div className="row">
                            <div className="col-md-4">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-center align-items-center experience">
                                        <h4 className="text-right">Ảnh Minh chứng</h4>
                                    </div>
                                    <br />
                                    <div className="col-md-12">
                                        <>
                                            <Upload
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                listType="picture-card"
                                                fileList={fileList}
                                                onPreview={handlePreview}
                                                onChange={handleChange}
                                                onRemove={handleRemove}
                                                accept="image/png, image/jpeg, image/jpg"
                                            >
                                                {fileList.length >= 5 ? null : uploadButton}
                                            </Upload>
                                            <Modal
                                                open={previewOpen}
                                                title={previewTitle}
                                                footer={null}
                                                onCancel={handleCancel}
                                            >
                                                <img
                                                    alt="example"
                                                    style={{
                                                        width: "100%",
                                                    }}
                                                    src={previewImage}
                                                />
                                            </Modal>
                                        </>
                                    </div>
                                    <br />
                                </div>
                            </div>
                            <div className="col-md-8 border-right">
                                <div className="p-4 py-5">
                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                        <h4 className="text-right">Thông Tin</h4>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <label className="labels">
                                                <strong style={{ color: "red", fontSize: 15 }}>
                                                    {" "}
                                                    *Số tiền muốn kêu gọi
                                                </strong>
                                                <br></br>
                                                <p className="attention">
                                                    (Lưu ý: nếu số tiền kêu gọi quá 500 triệu khả
                                                    năng cao sẽ bị từ chối)
                                                </p>
                                            </label>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "left",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <input
                                                    style={{ textAlign: "right", maxWidth: 200 }}
                                                    type="text"
                                                    className="form-control"
                                                    name="amountLimit"
                                                    value={amountLimit}
                                                    onChange={onChangeCreateCharityCallForm}
                                                />
                                                <p style={{ padding: "0 10px" }}>VNĐ</p>
                                            </div>
                                        </div>
                                        <div className="col-md-12" style={{ marginTop: 15 }}>
                                            <label className="labels">
                                                <strong style={{ color: "red", fontSize: 15 }}>
                                                    {" "}
                                                    *Mô tả lời kêu gọi
                                                </strong>
                                                <br></br>
                                            </label>

                                            <textarea
                                                style={{
                                                    textAlign: "left",
                                                    height: 200,
                                                    maxHeight: 250,
                                                }}
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                value={description}
                                                onChange={onChangeCreateCharityCallForm}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-5 text-center">
                                        <button
                                            onClick={onSubmit}
                                            className="btn btn-primary profile-button"
                                            type="button"
                                            disabled={disableCreateCharityCall}
                                        >
                                            Save Profile
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

export default CreateCharityCall;
