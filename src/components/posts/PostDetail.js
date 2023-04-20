import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { posts$ } from "../../redux/selectors";

import { getPostDetail, getPosts } from "../../redux/actions/posts";

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const posts = useSelector(posts$);

    useEffect(() => {
        dispatch(getPostDetail.getPostDetailRequest(id));
    }, [id]);

    console.log(posts);

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
    console.log(posts.singlePostDetail?.description);
    const lstString = posts.singlePostDetail?.description.split("\\n");
    console.log(lstString);
    /*
Hello, World,
and all you beautiful people in it!
*/
    return (
        <>
            <div class="single">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="single-content">
                                <img
                                    src={posts.singlePostDetail?.thumbnail ?? "/img/charity.png"}
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
                            <div class="single-tags">
                                <a href="">National</a>
                                <a href="">International</a>
                                <a href="">Economics</a>
                                <a href="">Politics</a>
                                <a href="">Lifestyle</a>
                                <a href="">Technology</a>
                                <a href="">Trades</a>
                            </div>
                            <div class="single-bio">
                                <div class="single-bio-img">
                                    <img src="img/user.jpg" />
                                </div>
                                <div class="single-bio-text">
                                    <h3>Author Name</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet elit. Integer lorem augue purus
                                        mollis sapien, non eros leo in nunc. Donec a nulla vel
                                        turpis tempor ac vel justo. In hac platea dictumst.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="sidebar">
                                <div class="sidebar-widget">
                                    <h2 class="widget-title">Recent Post</h2>
                                    <div class="recent-post">
                                        <div class="post-item">
                                            <div class="post-img">
                                                <img src="img/post-1.jpg" />
                                            </div>
                                            <div class="post-text">
                                                <a href="">
                                                    Lorem ipsum dolor sit amet consec adipis elit
                                                </a>
                                                <div class="post-meta">
                                                    <p>
                                                        By<a href="">Admin</a>
                                                    </p>
                                                    <p>
                                                        In<a href="">Web Design</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="post-item">
                                            <div class="post-img">
                                                <img src="img/post-2.jpg" />
                                            </div>
                                            <div class="post-text">
                                                <a href="">
                                                    Lorem ipsum dolor sit amet consec adipis elit
                                                </a>
                                                <div class="post-meta">
                                                    <p>
                                                        By<a href="">Admin</a>
                                                    </p>
                                                    <p>
                                                        In<a href="">Web Design</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="post-item">
                                            <div class="post-img">
                                                <img src="img/post-3.jpg" />
                                            </div>
                                            <div class="post-text">
                                                <a href="">
                                                    Lorem ipsum dolor sit amet consec adipis elit
                                                </a>
                                                <div class="post-meta">
                                                    <p>
                                                        By<a href="">Admin</a>
                                                    </p>
                                                    <p>
                                                        In<a href="">Web Design</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="post-item">
                                            <div class="post-img">
                                                <img src="img/post-4.jpg" />
                                            </div>
                                            <div class="post-text">
                                                <a href="">
                                                    Lorem ipsum dolor sit amet consec adipis elit
                                                </a>
                                                <div class="post-meta">
                                                    <p>
                                                        By<a href="">Admin</a>
                                                    </p>
                                                    <p>
                                                        In<a href="">Web Design</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="post-item">
                                            <div class="post-img">
                                                <img src="img/post-5.jpg" />
                                            </div>
                                            <div class="post-text">
                                                <a href="">
                                                    Lorem ipsum dolor sit amet consec adipis elit
                                                </a>
                                                <div class="post-meta">
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

                                <div class="sidebar-widget">
                                    <div class="image-widget">
                                        <a href="#">
                                            <img src="img/blog-1.jpg" alt="Image" />
                                        </a>
                                    </div>
                                </div>

                                <div class="sidebar-widget">
                                    <div class="tab-post">
                                        <ul class="nav nav-pills nav-justified">
                                            <li class="nav-item">
                                                <a
                                                    class="nav-link active"
                                                    data-toggle="pill"
                                                    href="#popular"
                                                >
                                                    Popular
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a
                                                    class="nav-link"
                                                    data-toggle="pill"
                                                    href="#latest"
                                                >
                                                    Latest
                                                </a>
                                            </li>
                                        </ul>

                                        <div class="tab-content">
                                            <div id="featured" class="container tab-pane active">
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-1.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-2.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-3.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-4.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-5.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
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
                                            <div id="popular" class="container tab-pane fade">
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-1.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-2.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-3.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-4.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-5.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
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
                                            <div id="latest" class="container tab-pane fade">
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-1.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-2.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-3.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-4.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
                                                            <p>
                                                                By<a href="">Admin</a>
                                                            </p>
                                                            <p>
                                                                In<a href="">Web Design</a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="post-item">
                                                    <div class="post-img">
                                                        <img src="img/post-5.jpg" />
                                                    </div>
                                                    <div class="post-text">
                                                        <a href="">
                                                            Lorem ipsum dolor sit amet consec adipis
                                                            elit
                                                        </a>
                                                        <div class="post-meta">
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
