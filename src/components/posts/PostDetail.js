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
        }).format(new Date(posts.singlePostDetail?.createdAt));

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
                                    }}
                                >
                                    {posts.singlePostDetail?.title}
                                    <h6 style={{ marginLeft: 15 }}>
                                        {" "}
                                        {posts.singlePostDetail?.createdAt}
                                    </h6>
                                </h2>
                                <p>{posts.singlePostDetail?.description}</p>
                                <p>
                                    Mauris eu pulvinar tellus, eu luctus nisl. Pellentesque suscipit
                                    mi eu varius pulvinar. Aenean vulputate, massa eget elementum
                                    finibus, ipsum arcu commodo est, ut mattis eros orci ac risus.
                                    Suspendisse ornare, massa in feugiat facilisis, eros nisl auctor
                                    lacus, laoreet tempus elit dolor eu lorem. Nunc a arcu suscipit,
                                    suscipit quam quis, semper augue.
                                </p>
                                <p>
                                    Quisque arcu nulla, convallis nec orci vel, suscipit elementum
                                    odio. Curabitur volutpat velit non diam tincidunt sodales.
                                    Nullam sapien libero, bibendum nec viverra in, iaculis ut eros.
                                </p>
                                <h3>Lorem ipsum dolor sit amet</h3>
                                <p>
                                    Vestibulum sit amet ullamcorper sem. Integer hendrerit elit eget
                                    purus sodales maximus. Quisque ac nulla arcu. Morbi venenatis
                                    arcu ac arcu cursus pharetra. Morbi sit amet viverra augue, ac
                                    ultricies libero. Praesent elementum lectus mi, eu elementum
                                    urna venenatis sed. Donec auctor purus ut mattis feugiat.
                                    Integer mi erat, consectetur sed tincidunt vitae, sagittis
                                    elementum libero. Vivamus a mauris consequat, hendrerit lectus
                                    in, fermentum libero. Integer mattis bibendum neque et
                                    porttitor.
                                </p>
                                <p>
                                    Mauris quis arcu finibus, posuere dolor eu, viverra felis. Orci
                                    varius natoque penatibus et magnis dis parturient montes,
                                    nascetur ridiculus mus. In porta, ex vitae accumsan facilisis,
                                    nisi tellus dictum metus, quis fringilla dui tellus in tellus.
                                    Praesent pharetra orci at vehicula posuere. Sed molestie
                                    fringilla lorem, vel imperdiet tortor blandit at. Quisque non
                                    ultrices lorem, eget rhoncus orci. Fusce porttitor placerat diam
                                    et mattis. Nam laoreet, ex eu posuere sollicitudin, sem tortor
                                    pellentesque ipsum, quis mattis purus lectus ut lacus. Integer
                                    eu risus ac est interdum scelerisque.
                                </p>
                                <h4>Lorem ipsum dolor sit amet</h4>
                                <p>
                                    Praesent ultricies, mauris eget vestibulum viverra, neque lorem
                                    malesuada mauris, eget rhoncus lectus enim a lorem. Vivamus at
                                    vehicula risus, eget facilisis massa. Lorem ipsum dolor sit
                                    amet, consectetur adipiscing elit. Cras et posuere sapien. Fusce
                                    bibendum lorem sem, quis tincidunt felis mattis nec.
                                </p>
                                <p>
                                    Proin vel nulla purus. Nunc nec eros in nisi efficitur rutrum
                                    quis sed eros. Mauris felis dolor, rhoncus eget gravida vitae,
                                    pretium vel arcu. Cras blandit tellus eget tellus dictum
                                    venenatis. Sed ultricies bibendum dictum. Etiam facilisis erat
                                    id turpis tincidunt malesuada. Duis bibendum sapien eu
                                    condimentum sagittis. Proin nunc lorem, ullamcorper vel tortor
                                    sodales, imperdiet lacinia dui. Sed congue, felis id rhoncus
                                    varius, urna lacus imperdiet nunc, ut porttitor mauris mi quis
                                    mi. Integer rutrum est finibus metus eleifend scelerisque. Morbi
                                    auctor dignissim purus in interdum. Vestibulum eu dictum enim.
                                    Suspendisse et sem vitae velit feugiat facilisis.
                                </p>
                                <p>
                                    Nam sodales scelerisque nunc sed convallis. Vestibulum facilisis
                                    porta erat, sit amet pharetra tortor blandit id. Nunc velit
                                    tellus, consectetur sed convallis in, tincidunt finibus nulla.
                                    Integer vel ex in mauris tincidunt tincidunt nec sed elit. Etiam
                                    pretium lectus lectus, sed aliquet erat tristique euismod.
                                    Praesent faucibus nisl augue, ac tempus libero pellentesque
                                    malesuada. Vivamus iaculis imperdiet laoreet. Aliquam vel felis
                                    felis. Proin sed sapien erat. Etiam a quam et metus tempor
                                    rutrum. Curabitur in faucibus justo. Etiam imperdiet iaculis
                                    urna.
                                </p>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
