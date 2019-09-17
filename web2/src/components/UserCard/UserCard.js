import React from 'react';
import UserAvatar from "./UserAvatar";
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import UserDisplayName from "./UserDisplayName";
import UserLoginName from "./UserLoginName";

const useStyles = makeStyles({
  avatar: {
    width: 64,
    height: 64
  }
});

const UserCard = ({ user, children }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardHeader
          avatar={<UserAvatar user={user} className={classes.avatar}/>}
          title={<UserLoginName user={user} />}
          subheader={<UserDisplayName user={user}/>}
        />
      </CardActionArea>
      {children}
    </Card>
  );
};

export default UserCard;
