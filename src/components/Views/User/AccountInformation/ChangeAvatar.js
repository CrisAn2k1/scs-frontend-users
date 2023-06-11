import React, { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { AuthContext } from "../../../../contexts/AuthContext";
import axios from "axios";
import { apiURL } from "../../../../api";
import { convertFormData } from "../../../../utils/form-data";
import Loading from "../../../layouts/Loading";
import Swal from "sweetalert2";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
    if (!isJpgOrPng) {
        message.error(`Vui lòng chọn ảnh có định dạng:" .jpg/ .png/ .jpeg "!`);
        return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Vui lòng chọn ảnh có kích cỡ nhỏ hơn 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

const ChangeAvatar = () => {
    const {
        authState: { user, isAuthenticated, authLoading },
        loadUser,
    } = useContext(AuthContext);

    const [imgAvatar, setImgAvatar] = useState([]);
    const [avatarSubmit, setAvatarSubmit] = useState(false);

    // Upload img
    const [loading, setLoading] = useState(false);

    const handleChange = ({ fileList: newFileList }) => {
        if (newFileList[0].status === "uploading") {
            setLoading(true);
        }
        setImgAvatar(newFileList);
        console.log(newFileList[0]);

        // Get this url from response in real world.
        getBase64(newFileList[0].originFileObj, (url) => {
            var previewAvatar = document.getElementById("avatar");
            previewAvatar.src = url;
            setLoading(false);
        });

        setAvatarSubmit(true);
    };

    // change avatar

    const onSubmitChangeAvatar = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const res = await axios.patch(
                apiURL + `/users/${user?.data?.id}/avatar`,
                convertFormData({ avatar: imgAvatar }),
            );
            if (res.data) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Thông Báo!",
                    text: "Cập nhật avatar thành công!",
                    showConfirmButton: true,
                    timer: 5000,
                });
                setAvatarSubmit(false);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setAvatarSubmit(false);
        }
    };

    return (
        <>
            <Loading hidden={!loading} />
            <img
                id="avatar"
                src={
                    user?.data?.avatar?.url ||
                    "https://static.vecteezy.com/system/resources/previews/000/597/449/original/hand-care-logo-vector.jpg"
                }
            />
            <div>
                <div hidden>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        listType="picture-card"
                        fileList={imgAvatar}
                        id="imageUpload"
                        accept="image/png, image/jpeg, image/jpg"
                        maxCount={1}
                    >
                        <PlusOutlined />
                    </Upload>
                </div>

                <label id="upload-img" htmlFor="imageUpload">
                    <i style={{ fontSize: 22 }} class="bi bi-pencil-square"></i>
                </label>
            </div>
            <button
                hidden={!avatarSubmit}
                type="submit"
                id="submitButton"
                onClick={onSubmitChangeAvatar}
                className="btn btn-primary profile-button"
                style={{ width: "fit-content", margin: 10 }}
            >
                Lưu Ảnh
                <span id="loader" />
            </button>
        </>
    );
};

export default ChangeAvatar;
