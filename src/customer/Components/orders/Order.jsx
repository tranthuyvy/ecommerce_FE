import { Box, Grid, Avatar, AvatarGroup } from "@mui/material";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import OrderCard from "./OrderCard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory, getFilteredOrders } from "../../../Redux/Customers/Order/Action";

const orderStatus = [
  { label: "PLACED", value: "placed" },
  { label: "CONFIRMED", value: "confirmed" },
  { label: "SHIPPED", value: "shipped" },
  { label: "DELIVERED", value: "delivered" },
  { label: "CANCELLED", vlue: "cancelled" },
  { label: "RETURNED", vlue: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);
  const [filterState, setFilterState] = useState({
    PLACED: false,
    CONFIRMED: false,
    SHIPPED: false,
    DELIVERED: false,
    CANCELLED: false,
    RETURNED: false,
  });

  const handleFilterChange = (value) => {
    setFilterState((prevState) => ({
      ...prevState,
      [value]: !prevState[value],
    }));
  };

  useEffect(() => {
    const filterParams = Object.keys(filterState)
      .filter((key) => filterState[key])
      .map((key) => key.toLowerCase());

    if (filterParams.length > 0) {
      dispatch(getFilteredOrders({ status: filterParams.join(",") }));
    } else {
      dispatch(getOrderHistory({ jwt }));
    }
  }, [filterState, jwt, dispatch]);

  return (
    <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5} className="">
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filters</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    //   id={`filter-${section.id}-${optionIdx}`}
                    //   name={`${section.id}[]`}
                    // defaultValue={option.value}
                    type="checkbox"
                    checked={filterState[option.value]}
                    onChange={() => handleFilterChange(option.value)}
                    // defaultChecked={option.checked}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    //   htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Box className="space-y-5">
            {order.orders?.length>0 && order.orders?.map((order )=> {
              return order?.orderItems?.map((item,index)=> <OrderCard item={item} order={order} />)
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
