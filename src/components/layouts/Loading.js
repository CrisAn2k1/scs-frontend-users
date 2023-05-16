import React from "react";

const Loading = ({ hidden }) => {
    return (
        <>
            <div
                style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    background: "#0d0c0c94",
                    zIndex: 2,
                    top: 0,
                    left: 0,
                }}
                hidden={hidden}
            >
                <div
                    id="loader"
                    className="show"
                    style={{
                        width: 70,
                        height: 70,
                        background: "#1f13120a",
                        position: "fixed",
                        zIndex: 1,
                        top: "50%",
                        left: "50%",
                        visibility: "unset",
                        opacity: "unset",
                    }}
                >
                    <div className="loader" />
                </div>
            </div>{" "}
        </>
    );
};

export default Loading;
