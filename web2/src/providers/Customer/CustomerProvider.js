import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

export const CustomerContext = React.createContext(null);

const postGetCustomerProfile = async userid => {
  const resp = await fetch(
    "/services/web/CustomerService1.svc/GetCustomerProfile",
    {
      method: "POST",
      body: JSON.stringify({
        userid: userid
      })
    }
  );

  return await resp.json();
};

const postPutCustomerProfile = async (userid, address, phone) => {
  const resp = await fetch(
    "/services/web/CustomerService1.svc/PutCustomerProfile",
    {
      method: "POST",
      body: JSON.stringify({
        userid: userid,
        address: address,
        phone: phone
      })
    }
  );

  return await resp.json();
};

const postAttachPaymentMethod = async (userid, paymentmethodid) => {
  const resp = await fetch(
    "/services/web/CustomerService1.svc/AttachPaymentMethod",
    {
      method: "POST",
      body: JSON.stringify({
        userid: userid,
        paymentmethodid: paymentmethodid
      })
    }
  );

  return await resp.json();
};

const postSetDefaultPaymentMethod = async (userid, paymentmethodid) => {
  const resp = await fetch(
    "/services/web/CustomerService1.svc/SetDefaultPaymentMethod",
    {
      method: "POST",
      body: JSON.stringify({
        userid: userid,
        paymentmethodid: paymentmethodid
      })
    }
  );

  return await resp.json();
};

const postDetachPaymentMethod = async (userid, paymentmethodid) => {
  const resp = await fetch(
    "/services/web/CustomerService1.svc/DetachPaymentMethod",
    {
      method: "POST",
      body: JSON.stringify({
        userid: userid,
        paymentmethodid: paymentmethodid
      })
    }
  );

  return await resp.json();
};

const getStripePublicKey = async () => {
  const resp = await fetch(
    "/services/web/PreferenceService1.svc/SystemPreference?key=stripe-api-public-key"
  );

  return await resp.json();
};

export const CustomerProvider = ({ user = {}, children }) => {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [stripeAPIKey, setStripeAPIKey] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    Promise.all([postGetCustomerProfile(user.id), getStripePublicKey()]).then(
      ([customer, key]) => {
        setCustomer(customer);
        setStripeAPIKey(key);
        setLoading(false);
      }
    );
  }, [setCustomer, setLoading]);

  const update = useCallback(
    ({ address, phone }, done) => {
      setLoading(true);
      postPutCustomerProfile(user.id, address, phone).then(customer => {
        setCustomer(customer);
        setLoading(false);

        refresh();

        if (done) done(customer);
      });
    },
    [setCustomer, setLoading]
  );

  const attachPaymentMethod = useCallback(
    paymentmethodid => {
      setLoading(true);
      postAttachPaymentMethod(user.id, paymentmethodid).then(customer => {
        setCustomer(customer);
        setLoading(false);
      });
    },
    [setCustomer, setLoading]
  );

  const setDefaultPaymentMethod = useCallback(
    paymentmethodid => {
      setLoading(true);
      postSetDefaultPaymentMethod(user.id, paymentmethodid).then(customer => {
        setCustomer(customer);
        setLoading(false);
      });
    },
    [setCustomer, setLoading]
  );

  const detachPaymentMethod = useCallback(
    paymentmethodid => {
      setLoading(true);
      postDetachPaymentMethod(user.id, paymentmethodid).then(customer => {
        setCustomer(customer);
        setLoading(false);
      });
    },
    [setCustomer, setLoading]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <CustomerContext.Provider
      value={{
        loading,
        customer,
        user,
        refresh,
        update,
        attachPaymentMethod,
        setDefaultPaymentMethod,
        detachPaymentMethod,
        stripeAPIKey
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

CustomerProvider.propTypes = {
  user: PropTypes.object,
  children: PropTypes.element
};
