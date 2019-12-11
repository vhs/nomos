import React, { useState, useContext } from "react";
import { IdentityContext } from "../../../providers/Identity";
import { CustomerProvider } from "../../../providers/Customer";
import { PlansProvider } from "../../../providers/Plans";
import StripePlans from "./StripePlans";

const stages = {
  products: "products",
  plans: "plans",
  subscribe: "subscribe",
  customer: "customer",
  confirm: "confirm",
  success: "success"
};

const StripeCheckoutStages = () => {
  const [stage, setStage] = useState(stages.products);
  const [selectedPlan, setPlan] = useState(null);

  const handleSubscribe = plan => {
    setPlan(plan);
    setStage(stages.subscribe);
  };

  switch (stage) {
    case stages.products:
      return <StripePlans onSubscribe={handleSubscribe} />;
    case stages.subscribe:
      return <div>{JSON.stringify(selectedPlan)}</div>;
    default:
      <div>error</div>;
      break;
  }
};

const StripeCheckout = () => {
  const { identity } = useContext(IdentityContext);

  return (
    <PlansProvider>
      <CustomerProvider userid={identity.id}>
        <StripeCheckoutStages />
      </CustomerProvider>
    </PlansProvider>
  );
};

export default StripeCheckout;
