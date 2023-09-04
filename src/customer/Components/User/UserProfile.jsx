import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        if (jwt) {
          // Nếu có mã JWT, thêm nó vào tiêu đề Authorization
          axios.get('http://localhost:5454/api/users/profile', {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
            .then((response) => {
              setUser(response.data);
            })
            .catch((error) => {
              console.error('Lỗi khi gọi API:', error);
            });
        }
      }, [jwt]);

    if (user === null){
        return <div>Loading ...</div>
    }

    const address = user.addresses && user.addresses.length > 0 ? user.addresses[0] : null;

    return (
      <div>
        <h1>User Profile</h1>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Email: {user.email}</p>
        {address ? (
          <div>
            <h2>Address</h2>
            <p>Street Address: {address.streetAddress}</p>
            <p>City: {address.city}</p>
            <p>State: {address.state}</p>
            <p>Zip Code: {address.zipCode}</p>
            <p>Mobile: {address.mobile}</p>
          </div>
        ) : (
          <p>No address information available.</p>
        )}
      </div>
  )
}

export default UserProfile