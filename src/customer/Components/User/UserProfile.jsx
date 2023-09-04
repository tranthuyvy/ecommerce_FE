import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Fragment } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      axios
        .get("http://localhost:5454/api/users/profile", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API:", error);
        });
    }
  }, [jwt]);

  if (user === null) {
    return <div>Loading ...</div>;
  }

  const address =
    user.addresses && user.addresses.length > 0 ? user.addresses[0] : null;

  return (
    <Fragment className="createProductContainer ">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Profile
      </Typography>
      <form
        // onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
            //   label="Email"
              name="email"
              value={user.email}
            //   onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
            //   label="Brand"
              name="firstName"
              value={user.firstName}
            //   onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
            //   label="Title"
              name="lastName"
              value={user.lastName}
            //   onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
            //   label="Color"
              name="street"
              value={address.streetAddress}
            //   onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
            //   label="Quantity"
              name="state"
              value={address.state}
            //   onChange={handleChange}
              
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
            //   label="Price"
              name="city"
              value={address.city}
            //   onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
            //   label="Discounted Price"
              name="zipCode"
              value={address.zipCode}
            //   onChange={handleChange}
            //   type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
            //   label="Discount Percentage"
              name="mobile"
              value={address.mobile}
            //   onChange={handleChange}
              type="number"
            />
          </Grid>
    
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default UserProfile;
