import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../../Redux/Customers/Review/Action";
import { findProductById } from "../../../Redux/Customers/Product/Action";
import { format } from 'date-fns';
import { Rating, Grid, Box, Avatar } from "@mui/material";

const ProductReviews = () => {
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customersProduct } = useSelector((store) => store);

  useEffect(() => {
    const data = { productId: Number(productId), jwt };
    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId]);

  const [value, setValue] = React.useState(4.5);

  return (
    <div>
      <h2>Product Reviews</h2>
      <ul>
        {customersProduct.product?.reviews && customersProduct.product?.reviews.map((item) => (
          <div className="">
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
              alt={item.user.firstName}
              src=""
            >
              {item.user.firstName[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-2">
            <div className="">
              <p className="font-semibold text-lg">{item.user.firstName}</p>
              <p className="opacity-70 mt-1">{format(new Date(item.createdAt), 'dd/MM/yyyy')}</p>
            </div>
            <div>
            
              <Rating
                value={item.star}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
              />
             
            </div>
            <p>
              {item.review}
            </p>
          </div>
        </Grid>
      </Grid>
      <div className="col-span-1 flex"></div>
    </div>
        ))}
      </ul>
      <button 
        className="mt-10 w-[10rem] h-[5rem] bg-white text-indigo-600 text-lg font-bold border rounded-md" 
        onClick={() => navigate(`/admin/products`)}>Back</button>
    </div>
  );
};

export default ProductReviews;
