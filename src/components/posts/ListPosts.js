import { Link } from "react-router-dom";
import Loading from "../layouts/Loading";
import { useEffect, useState } from "react";

const ListPosts = ({ posts, title }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        posts ? setIsLoading(false) : setIsLoading(true);
    }, [posts]);

    return (
        <>
            <Loading hidden={!isLoading} />
            <div className="recent-post" style={{ padding: "0 10px" }}>
                <h2 className="widget-title">{title}</h2>
                {posts?.length ? (
                    <div style={{ height: 250, overflowY: "scroll" }} className="scroll-bar">
                        {posts?.map((item) => {
                            item.createdAt = new Intl.DateTimeFormat("en-US", {
                                hour12: true,
                                hour: "numeric",
                                minute: "numeric",
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            })
                                .format(new Date(item.createdAt))
                                .substring(0, 10);
                            return (
                                <div key={item.id}>
                                    <Link to={`/posts/${item.id}`} title={item.title.toLowerCase()}>
                                        <div className="post-item">
                                            <div className="post-img" style={{ width: "30" }}>
                                                <img
                                                    src={item.thumbnail?.url ?? "/img/charity.png"}
                                                />
                                            </div>
                                            <div className="post-text" style={{ width: "70%" }}>
                                                <h4
                                                    style={{
                                                        fontFamily: `"Comic Sans MS", "Poppins-Regular", "Arial", "Times"`,
                                                        textAlign: "justify",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        textTransform: "capitalize",
                                                        fontSize: 16,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {" "}
                                                    {item.title}
                                                </h4>
                                                <div className="post-meta">
                                                    <p
                                                        style={{
                                                            color: "#9c6969fc",
                                                        }}
                                                    >
                                                        <i className="fa fa-calendar-alt"></i>
                                                        &ensp;
                                                        {item.createdAt}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p style={{ textAlign: "center", marginBottom: 200 }}>
                        Hiện không có bài viết nào khác
                    </p>
                )}
            </div>
        </>
    );
};

export default ListPosts;
