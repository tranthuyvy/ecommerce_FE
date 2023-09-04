import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
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
          setUser(response.data);

          setEditedUser(response.data);

          setIsEditing(false);
            setUpdateSuccess(true);
        })
        .catch((error) => {
          console.error("Lỗi khi gọi API:", error);
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
    axios.put("http://localhost:5454/api/users/profile", editedUser, {
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
        console.error("Error: ", error);
    });
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
        setEditedUser((prevData) => ({
            ...prevData,
            [name]: value,
        }));
  };

  if (user === null) {
    return <div>Loading ...</div>;
  }

  const address =
    user.addresses && user.addresses.length > 0 ? user.addresses[0] : null;

  return (
    <Fragment className="updateProfileContainer ">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Profile
      </Typography>
      <form
        // onSubmit={handleSubmit}
        className="updateProfileContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
            //   label="Email"
              name="email"
              value={editedUser.email}
            //   onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="firstName"
              value={editedUser.firstName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="lastName"
              value={editedUser.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="street"
              value={address.streetAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="state"
              value={address.state}
              onChange={handleChange}
              
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="city"
              value={address.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              name="mobile"
              value={editedUser.mobile}
              onChange={handleChange}
              type="number"
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
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
