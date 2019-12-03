import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import GoodStandingIcon from "@material-ui/icons/SentimentVerySatisfiedRounded";
import BadStandingIcon from "@material-ui/icons/SentimentDissatisfiedRounded";
import PendingAccountIcon from "@material-ui/icons/SyncProblemRounded";
import InactiveAccountIcon from "@material-ui/icons/AcUnitRounded";
import BannedAccountIcon from "@material-ui/icons/ReportRounded";
import UnknownStandingIcon from "@material-ui/icons/ReportProblemRounded";

const UserStandingIcon = ({ user, classes }) => {
  switch (user.active) {
    case "y": {
      if (user.isGoodStanding) {
        return (
          <Tooltip title="Account is in good standing!" placement="right-end">
            <GoodStandingIcon className={classes.green} />
          </Tooltip>
        );
      } else {
        return (
          <Tooltip
            title="Account is in bad standing! Likely behind on payments!"
            placement="right-end"
          >
            <BadStandingIcon className={classes.red} />
          </Tooltip>
        );
      }
    }
    case "t": {
      return (
        <Tooltip
          title="Account pending activation, please contact member coordinator"
          placement="right-end"
        >
          <PendingAccountIcon className={classes.yellow} />
        </Tooltip>
      );
    }
    case "n": {
      return (
        <Tooltip title="Account is inactive" placement="right-end">
          <InactiveAccountIcon className={classes.grey} />
        </Tooltip>
      );
    }
    case "b": {
      return (
        <Tooltip title="This user is banned!" placement="right-end">
          <BannedAccountIcon className={classes.red} />
        </Tooltip>
      );
    }
    default: {
      return <UnknownStandingIcon className={classes.grey} />;
    }
  }
};

UserStandingIcon.propTypes = {
  user: PropTypes.object,
  classes: PropTypes.object
};

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`
  },
  green: {
    color: "rgba(0, 128, 0, 1)",
    backgroundColor: "rgba(0, 255, 0, 1)"
  },
  yellow: {
    color: "rgba(128, 128, 0, 1)",
    backgroundColor: "rgba(255, 255, 0, 1)"
  },
  red: {
    color: "rgba(128, 0, 0, 1)",
    backgroundColor: "rgba(255, 0, 0, 1)"
  },
  grey: {
    color: "rgba(64, 64, 64, 1)",
    backgroundColor: "rgba(128, 128, 128, 1)"
  }
}));

const UserStanding = ({ user }) => {
  const classes = useStyles();

  return (
    <Avatar className={classes.avatar}>
      <UserStandingIcon user={user} classes={classes} />
    </Avatar>
  );
};

UserStanding.propTypes = {
  user: PropTypes.object
};

export default UserStanding;
