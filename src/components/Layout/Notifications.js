import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import PropTypes from "prop-types";

// MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

// ICONS
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavouriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// REDUX
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

const Notifications = (props) => {
  const [anchor, setAnchor] = useState("");

  const notifications = props.notifications;

  dayjs.extend(relativeTime);

  const handleOpen = e => {
    setAnchor(e.target);
  }

  const handleClose = e => {
    setAnchor(null);
  }

  const onMenuOpened = e => {
    let unreadNotificationsIds = notifications && notifications.filter(not => !not.read)
      .map(not => not.notificationId);
    props.markNotificationsRead(unreadNotificationsIds);
  }

  let notificationIcon;

  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color='secondary'
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />);
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === "like" ? "liked" : "commented on";
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? "primary" : "secondary";
        const icon =
          not.type === "like" ? (
            <FavouriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} />
          );

        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color='default'
              variant='body1'
              to={`/users/${not.recipient}/scream/${not.screamId}`}
            >
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onCLick={handleClose}>You have no notification yet</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip placement='bottom' title='Notifications'>
        <IconButton
          aria-owns={anchor ? "simple-menu" : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
};

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
  Notifications: state.user.notification,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
