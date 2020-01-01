export const postGetCustomerProfile = async userid => {
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

export const postPutCustomerProfile = async (userid, address, phone) => {
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

export const postAttachPaymentMethod = async (userid, paymentmethodid) => {
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

export const postSetDefaultPaymentMethod = async (userid, paymentmethodid) => {
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

export const postDetachPaymentMethod = async (userid, paymentmethodid) => {
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
