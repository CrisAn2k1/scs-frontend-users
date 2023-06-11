import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
const styles = (theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
});

const ListDonation = ({ listDonation }) => {
    // const { classes } = props;
    console.log(listDonation);
    return (
        <div>
            <h3 className="widget-title">Danh Sách Ủng Hộ</h3>
            <div style={{ height: 400, overflowY: "scroll" }} className="scroll-bar">
                <List
                    // className={classes.root}
                    style={{ width: "100%", padding: "0 10px 0 5px", maxWidth: "none" }}
                >
                    {listDonation?.length ? (
                        listDonation?.map((item) => {
                            return (
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={
                                                item.isAnonymous
                                                    ? " https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                                                    : item.user.avatar.url
                                            }
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "left",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: "bold",
                                                        width: "-webkit-fill-available",
                                                    }}
                                                >
                                                    {item.isAnonymous
                                                        ? "*********"
                                                        : item.user.fullName}
                                                </div>
                                                <div
                                                    style={{
                                                        fontStyle: "italic",
                                                        paddingLeft: 10,
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    {new Intl.DateTimeFormat("en-US", {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                    }).format(new Date(item.createdAt))}
                                                </div>
                                            </div>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    style={{ color: "red", fontWeight: "bold" }}
                                                >
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "vnd",
                                                    }).format(item.amount)}
                                                </Typography>
                                                {item.description?.length &&
                                                    " - " + item.description}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            );
                        })
                    ) : (
                        <h6 style={{ textAlign: "center", paddingTop: 50 }}>
                            Hiện chưa có ai ủng hộ từ thiện!
                        </h6>
                    )}
                </List>
            </div>
        </div>
    );
};

export default withStyles(styles)(ListDonation);
