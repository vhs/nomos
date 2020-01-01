import React, { useContext } from "react";
import { SubscriptionsProvider } from "../../providers/Subscriptions";
import { IdentityContext } from "../../providers/Identity";
import Subscriptions from "./Subscriptions";

const Profile = () => {
  const { identity } = useContext(IdentityContext);
  return (
    <SubscriptionsProvider user={identity}>
      <div>Profile</div>
      <Subscriptions />
    </SubscriptionsProvider>
  );
};

export default Profile;
