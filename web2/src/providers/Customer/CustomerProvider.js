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

export const CustomerProvider = ({ userid, children }) => {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    postGetCustomerProfile(userid).then(customer => {
      setCustomer(customer);
      setLoading(false);
    });
  }, [setCustomer, setLoading]);

  const update = useCallback(
    ({ address, phone }) => {
      setLoading(true);
      postPutCustomerProfile(userid, address, phone).then(customer => {
        setCustomer(customer);
        setLoading(false);
      });
    },
    [setCustomer, setLoading]
  );

  const attachPaymentMethod = useCallback(
    paymentmethodid => {
      setLoading(true);
      postAttachPaymentMethod(userid, paymentmethodid).then(customer => {
        setCustomer(customer);
        setLoading(false);
      });
    },
    [setCustomer, setLoading]
  );

  const setDefaultPaymentMethod = useCallback(
    paymentmethodid => {
      setLoading(true);
      postSetDefaultPaymentMethod(userid, paymentmethodid).then(customer => {
        setCustomer(customer);
        setLoading(false);
      });
    },
    [setCustomer, setLoading]
  );

  const detachPaymentMethod = useCallback(
    paymentmethodid => {
      setLoading(true);
      postDetachPaymentMethod(userid, paymentmethodid).then(customer => {
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
        refresh,
        update,
        attachPaymentMethod,
        setDefaultPaymentMethod,
        detachPaymentMethod
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

CustomerProvider.propTypes = {
  userid: PropTypes.number,
  children: PropTypes.element
};
