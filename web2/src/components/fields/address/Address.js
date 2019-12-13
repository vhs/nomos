import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Street from "./Street";
import PostalCode from "./PostalCode";
import City from "./City";
import Province from "./Province";
import Country from "./Country";

const defaultValue = {
  street: "",
  city: "",
  province: "",
  country: "",
  postalCode: ""
};

const mapAddress = value =>
  Object.keys(value).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        value: value[key],
        valid: true
      }
    }),
    {}
  );

const Address = ({ address = defaultValue, onChange, ...rest }) => {
  const [$address, $setValue] = useState(mapAddress(address));

  const { street, city, province, country, postalCode } = $address;

  const setValue = key =>
    useCallback(
      val => {
        const newValue = {
          ...$address,
          [key]: val
        };

        $setValue(newValue);
        onChange(
          Object.keys(newValue).reduce(
            (acc, key) => ({
              value: {
                ...acc.value,
                [key]: newValue[key].value
              },
              valid: acc.valid && newValue[key].valid
            }),
            {}
          )
        );
      },
      [$address, $setValue]
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Street
          value={street.value}
          valid={street.valid}
          onChange={setValue("street")}
          {...rest}
        />
      </Grid>
      <Grid item xs={6}>
        <City
          value={city.value}
          valid={city.valid}
          onChange={setValue("city")}
          {...rest}
        />
      </Grid>
      <Grid item xs={6}>
        <Province
          value={province.value}
          valid={province.valid}
          onChange={setValue("province")}
          {...rest}
        />
      </Grid>
      <Grid item xs={12}>
        <Country
          value={country.value}
          valid={country.valid}
          onChange={setValue("country")}
          {...rest}
        />
      </Grid>
      <Grid item xs={12}>
        <PostalCode
          value={postalCode.value}
          valid={postalCode.valid}
          onChange={setValue("postalCode")}
          {...rest}
        />
      </Grid>
    </Grid>
  );
};

Address.propTypes = {
  address: PropTypes.object,
  onChange: PropTypes.func
};

export default Address;
