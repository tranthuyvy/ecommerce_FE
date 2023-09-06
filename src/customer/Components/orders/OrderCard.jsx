import { Box, Grid, Typography, Avatar, AvatarGroup } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();

  let totalPrice = 0;

  order.orderItems.forEach((orderItem) => {
    totalPrice += orderItem.price;
  });

  console.log("items ", item, order, order.orderStatus);

  return (
    <Box className="p-5 shadow-lg hover:shadow-2xl border ">
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={4}>
          <div
            onClick={() => navigate(`/account/order/${order?.id}`)}
            className="flex cursor-pointer"
          >
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item?.product.imageUrl}
              alt=""
            />
            <div className="ml-5">
              <p className="mb-2">{item?.product.title}</p>
              <p className="opacity-50 text-xs font-semibold space-x-5">
                <span>
                  {item?.product.color}, {item?.size}
                </span>
              </p>
              <div className="mt-3">
                <AvatarGroup max={4} sx={{ justifyContent: "start" }}>
                  {order.orderItems.map((orderItem) => (
                    <Avatar
                      key={orderItem.product.id}
                      alt={orderItem.product.title}
                      src={orderItem.product.imageUrl}
                    />
                  ))}
                </AvatarGroup>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} container alignItems="center">
          <p className="opacity-50 text-sm mr-1">Total Items:</p>
          <p className="text-sm">{order?.totalItem}</p>
        </Grid>

        <Grid item xs={2} container alignItems="center">
          <p style={{ color: "black", opacity: "50%", marginRight: "4px" }}>
            Total:{" "}
          </p>
          <p style={{ color: "red" }}> ${totalPrice}</p>
        </Grid>

        <Grid item xs={4}>
          <p className="space-y-2 font-semibold">
            {order?.orderStatus === "DELIVERED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Delivered On Mar 03</span>
              </>
            ) : (
              <>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Expected Delivery On Mar 03</span>
              </>
            )}
          </p>
          <p className="text-xs">Your Item Has Been Delivered</p>
          {item.orderStatus === "DELIVERED" && (
            <div
              onClick={() => navigate(`/account/rate/{id}`)}
              className="flex items-center text-blue-600 cursor-pointer"
            >
              <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
              <span>Rate & Review Product</span>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
