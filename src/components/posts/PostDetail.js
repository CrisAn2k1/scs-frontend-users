import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { posts$, events$ } from "../../redux/selectors";

import { getPostDetail, getPosts } from "../../redux/actions/posts";
import ListPosts from "./ListPosts";
import axios from "axios";
import { apiURL } from "../../api";

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(posts$);
    const events = useSelector(events$);

    const [listPost, setListPost] = useState();

    useEffect(() => {
        dispatch(getPostDetail.getPostDetailRequest(id));
        getListPost();
    }, [id]);

    const getListPost = async () => {
        try {
            const resPost = await axios.post(`${apiURL}/posts/${id}`, {
                select: { event: { select: { posts: true } } },
            });
            if (resPost?.data?.data?.event) setListPost(resPost?.data?.data?.event?.posts);
        } catch (error) {}
    };

    if (posts.singlePostDetail?.createdAt)
        posts.singlePostDetail.createdAt = new Intl.DateTimeFormat("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
            .format(new Date(posts.singlePostDetail?.createdAt))
            .replace(",", "");
    const lstString = posts.singlePostDetail?.description.split("\\n");
    /*
Hello, World,
and all you beautiful people in it!
*/
    return (
        <>
            <button type="button" className="btn btn-custom-mirror btn-donation">
                Quyên Góp
            </button>
            {/* Page Header Start */}
            <div className="page-header" style={{ padding: "150px 0px 20px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>HELPZ</h2>
                        </div>
                        <div className="col-12">
                            <a>Give Is Receive</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End */}
            <div className="single">
                <div className="container" style={{ maxWidth: "90vw" }}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="single-content">
                                <img
                                    src={
                                        posts.singlePostDetail?.thumbnail?.url ?? "/img/charity.png"
                                    }
                                    // style={{width:10}}
                                />
                                <h2
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "left",
                                    }}
                                >
                                    {posts.singlePostDetail?.title}
                                </h2>
                                <h6 style={{ marginLeft: 15, marginTop: 15 }}>
                                    {" Ngày: "} {posts.singlePostDetail?.createdAt}
                                </h6>
                                <hr></hr>
                                {lstString?.length &&
                                    lstString.map((item) => (
                                        <>
                                            <p style={{ marginBottom: 7, textAlign: "justify" }}>
                                                &emsp;&emsp; {item}
                                            </p>
                                        </>
                                    ))}
                            </div>
                            <div className="single-tags">
                                <a href="">National</a>
                                <a href="">International</a>
                                <a href="">Economics</a>
                                <a href="">Politics</a>
                                <a href="">Lifestyle</a>
                                <a href="">Technology</a>
                                <a href="">Trades</a>
                            </div>
                            <div className="single-bio">
                                <div className="single-bio-img">
                                    <img src="img/user.jpg" />
                                </div>
                                <div className="single-bio-text">
                                    <h3>Author Name</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Integer lorem augue purus
                                        mollis sapien, non eros leo in nunc. Donec a nulla vel
                                        turpis tempor ac vel justo. In hac platea dictumst.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="sidebar-widget">
                                    <ListPosts
                                        posts={listPost?.filter((p) => p.id != id)}
                                        title={"Bài Viết Khác"}
                                    />
                                </div>

                                <div className="sidebar-widget">
                                    <div className="tab-post">
                                        <ul className="nav nav-pills nav-justified">
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link active"
                                                    data-toggle="pill"
                                                    href="#popular"
                                                >
                                                    Popular
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link"
                                                    data-toggle="pill"
                                                    href="#latest"
                                                >
                                                    Latest
                                                </a>
                                            </li>
                                        </ul>

                                        <div className="tab-content">
                                            <div
                                                id="featured"
                                                className="container tab-pane active"
                                            >
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-1.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-2.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-3.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-4.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-5.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="popular" className="container tab-pane fade">
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-1.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-2.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-3.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-4.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-5.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="latest" className="container tab-pane fade">
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-1.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-2.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-3.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-4.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-item">
                                                    <div className="post-img">
                                                        <img src="img/post-5.jpg" />
                                                    </div>
                                                    <div className="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div className="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
