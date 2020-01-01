import React, { useContext } from "react";
import { Switch, Route as DomRoute } from "react-router-dom";
import { IdentityContext } from "../../../providers/Identity";
import { CheckoutProvider } from "../../../providers/Checkout";
import { CustomerProvider } from "../../../providers/Customer";
import { PlansProvider } from "../../../providers/Plans";
import SubscriptionPlans from "./SubscriptionPlans";
import CustomerProfile from "./CustomerProfile";
import PaymentMethods from "./PaymentMethods";
import Confirm from "./Confirm";
import { SubscriptionsProvider } from "../../../providers/Subscriptions";

const Checkout = () => {
  const { identity } = useContext(IdentityContext);

  return (
    <CheckoutProvider>
      <PlansProvider>
        <CustomerProvider user={identity}>
          <SubscriptionsProvider user={identity}>
            <Switch>
              <DomRoute exact path="/subscribe" component={SubscriptionPlans} />
              <DomRoute path="/subscribe/billing" component={CustomerProfile} />
              <DomRoute path="/subscribe/payment" component={PaymentMethods} />
              <DomRoute path="/subscribe/confirm" component={Confirm} />
            </Switch>
          </SubscriptionsProvider>
        </CustomerProvider>
      </PlansProvider>
    </CheckoutProvider>
  );
};

export default Checkout;
