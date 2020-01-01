import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

export const SubscriptionsContext = React.createContext(null);

const postGetUserSubscriptions = async userid => {
  const resp = await fetch(
    "/services/web/SubscriptionService1.svc/GetUserSubscriptions",
    {
      method: "POST",
      body: JSON.stringify({
        userid: userid
      })
    }
  );

  return await resp.json();
};

const postCreatePlanSubscription = async (userid, items, paymentmethodid) => {
  const resp = await fetch(
    "/services/web/SubscriptionService1.svc/CreatePlanSubscription",
    {
      method: "POST",
      body: JSON.stringify({
        userid: userid,
        items: items,
        paymentmethodid: paymentmethodid
      })
    }
  );

  return await resp.json();
};

const postCancelPlanSubscription = async (userid, subscriptionid) => {
  const resp = await fetch(
    "/services/web/SubscriptionService1.svc/CancelPlanSubscription",
    {
      method: "POST",
      body: JSON.stringify({
        userid: userid,
        subscriptionid: subscriptionid
      })
    }
  );

  return await resp.json();
};

export const SubscriptionsProvider = ({ user = {}, children }) => {
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  const refresh = useCallback(() => {
    setLoading(true);
    postGetUserSubscriptions(user.id).then(subscriptions => {
      setSubscriptions(subscriptions);
      setLoading(false);
    });
  }, [setSubscriptions, setLoading]);

  const subscribe = useCallback(
    ({ items, paymentmethodid }, done) => {
      setLoading(true);
      postCreatePlanSubscription(user.id, items, paymentmethodid).then(
        subscription => {
          // TODO ensure payment succeeded

          refresh();

          if (done) done(subscription);
        }
      );
    },
    [refresh, setLoading]
  );

  const cancel = useCallback(
    (subscriptionid, done) => {
      setLoading(true);
      postCancelPlanSubscription(user.id, subscriptionid).then(subscription => {
        refresh();

        if (done) done(subscription);
      });
    },
    [refresh, setLoading]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <SubscriptionsContext.Provider
      value={{
        loading,
        subscriptions,
        user,
        refresh,
        subscribe,
        cancel
      }}
    >
      {children}
    </SubscriptionsContext.Provider>
  );
};

SubscriptionsProvider.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node
};
