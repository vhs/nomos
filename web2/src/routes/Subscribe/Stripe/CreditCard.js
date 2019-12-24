import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CreditCardSelectedIcon from "@material-ui/icons/CreditCardTwoTone";
import Typography from "@material-ui/core/Typography";
import CheckMarkIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";

import DefaultIcon from "@material-ui/icons/Bookmark";
import MarkDefaultIcon from "@material-ui/icons/BookmarkBorder";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  cardHighlighted: {
    border: "solid 2px",
    borderColor: theme.palette.secondary.main
  },
  cardRoot: {},
  headerRoot: {
    padding: 0,
    height: theme.spacing(8)
  },
  avatarHighlighted: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  avatar: {
    padding: theme.spacing(1),
    margin: 0
  },
  content: {
    width: theme.spacing(22),
    padding: theme.spacing(1),
    paddingLeft: 0
  },
  action: {
    margin: 0,
    padding: theme.spacing(0),
    width: theme.spacing(8),
    height: "100%"
  },
  default: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    display: "flex",
    justifyContent: "center"
  },
  defaultIcon: {
    margin: "auto"
  },
  nonDefault: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  actionButton: {
    padding: 0,
    height: theme.spacing(4),
    borderRadius: 0,
    margin: "0 !important"
  },
  buttonSetDefault: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  },
  buttonDelete: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText
  }
}));

const CreditCardActions = ({ classes, isDefault, disabled, onSetDefault, onDelete }) => {
  return isDefault ? (
    <Tooltip title="This is your default payment method">
      <DefaultIcon className={classes.defaultIcon} fontSize="large" />
    </Tooltip>
  ) : (
    <ButtonGroup orientation="vertical" variant="outlined" fullWidth>
      <Button
        disabled={disabled}
        onClick={onSetDefault}
        className={clsx(classes.buttonSetDefault, classes.actionButton)}
      >
        <MarkDefaultIcon fontSize="small" />
      </Button>
      <Button
        disabled={disabled}
        onClick={onDelete}
        className={clsx(classes.buttonDelete, classes.actionButton)}
      >
        <DeleteIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
};

const CreditCard = ({
  disabled = false,
  hideActions = false,
  brand,
  last4,
  exp_month,
  exp_year,
  isDefault,
  isHighlighted,
  onSetDefault,
  onDelete
}) => {
  const classes = useStyles();

  return (
    <Card
      raised={isHighlighted}
      classes={{
        root: clsx(
          classes.cardRoot,
          isHighlighted ? classes.cardHighlighted : undefined
        )
      }}
    >
      <CardHeader
        classes={{
          root: classes.headerRoot,
          avatar: classes.avatar,
          content: classes.content,
          action: clsx(
            classes.action,
            isDefault ? classes.default : classes.nonDefault
          )
        }}
        avatar={
          <Avatar
            className={isHighlighted ? classes.avatarHighlighted : undefined}
          >
            {isHighlighted ? (
              <CreditCardSelectedIcon fontSize="small" />
            ) : (
              <CreditCardIcon fontSize="small" />
            )}
          </Avatar>
        }
        title={`${brand} **** **** **** ${last4}`}
        subheader={`Expiry ${exp_month}/${exp_year}`}
        action={
          !hideActions && (
            <CreditCardActions
              classes={classes}
              disabled={disabled}
              isDefault={isDefault}
              onDelete={onDelete}
              onSetDefault={onSetDefault}
            />
          )
        }
      />
    </Card>
  );
};

export default CreditCard;
