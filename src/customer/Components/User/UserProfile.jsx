import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Fragment } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
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
          const userData = response.data;
          setUser(userData);

          setEditedUser({
            ...userData,
            street: userData.streetAddress,
            state: userData.state,
            city: userData.city,
            zipCode: userData.zipCode,
          });

          setIsEditing(false);
          setUpdateSuccess(true);
        })
        .catch((error) => {
          console.error(
            "Error Call API:",
            error.response?.data || error.message
          );
        });
    }
  }, [jwt]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);

    setEditedUser(user);
  };

  const handleSaveEdit = () => {
    const updatedAddress = {
      streetAddress: editedUser.streetAddress,
      city: editedUser.city,
      state: editedUser.state,
      zipCode: editedUser.zipCode,
    };

    if (editedUser.addresses && editedUser.addresses.length > 0) {
      editedUser.addresses[0] = updatedAddress;
    } else {
      // Nếu người dùng chưa có địa chỉ, tạo một đối tượng địa chỉ mới
      editedUser.addresses = [updatedAddress];
    }

    axios
      .put("http://localhost:5454/api/users/profile", editedUser, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
        setUpdateSuccess(true);
      })
      .catch((error) => {
        console.error("Error: ", error.response?.data || error.message);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (user === null) {
    return <div>Loading ...</div>;
  }

  //   const address =
  //     user.addresses && user.addresses.length > 0 ? user.addresses[0] : null;

  return (
    <Fragment className="updateProfileContainer ">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Profile
        <Avatar
          className="text-white"
          aria-haspopup="true"
          sx={{
            bgcolor: deepPurple[500],
            color: "white",
            cursor: "pointer",
          }}
        ></Avatar>
      </Typography>
      <form
        // onSubmit={handleSubmit}
        className="updateProfileContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={editedUser.email}
              //   onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Street"
              name="street"
              value={editedUser.street}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={editedUser.state}
              onChange={handleChange}
              disabled={!isEditing}
              
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={editedUser.city}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Zip Code"
              name="zipCode"
              value={editedUser.zipCode}
              onChange={handleChange}
              type="number"
              disabled={!isEditing}
            />
          </Grid> */}

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              value={editedUser.mobile}
              onChange={handleChange}
              type="number"
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12}>
            {isEditing ? (
              // Hiển thị nút chỉnh sửa và lưu khi trong trạng thái chỉnh sửa
              <>
                <Button
                  variant="contained"
                  sx={{ p: 1.8 }}
                  className="py-20"
                  size="large"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </Button>
                <Button
                  variant="contained"
                  sx={{ p: 1.8, ml: 2 }}
                  className="py-20"
                  size="large"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </>
            ) : (
              // Hiển thị nút chỉnh sửa khi không trong trạng thái chỉnh sửa
              <Button
                variant="contained"
                sx={{ p: 1.8 }}
                className="py-20"
                size="large"
                onClick={handleEdit}
              >
                Update Profile
              </Button>
            )}
            {/* <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Update Profile
            </Button> */}
          </Grid>
        </Grid>
      </form>

      {updateSuccess && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={updateSuccess}
          autoHideDuration={6000}
          onClose={() => setUpdateSuccess(false)}
        >
          <Alert onClose={() => setUpdateSuccess(false)} severity="success">
            Profile updated successfully!
          </Alert>
        </Snackbar>
      )}
    </Fragment>
  );
};

export default UserProfile;
