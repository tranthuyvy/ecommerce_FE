import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  findProducts,
} from "../../../Redux/Customers/Product/Action";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });

  // query
  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value - 1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    // setFilterValue({ availability, category, sort });
    const data = {
      category: category || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: sort || "price_low",
      pageNumber: page || 0,
      pageSize: 10,
      stock: availability,
    };
    dispatch(findProducts(data));
  }, [availability, category, sort, page, customersProduct.deleteProduct]);

  const handleFilterChange = (e, sectionId) => {
    console.log(e.target.value, sectionId);
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleDeleteProduct = (productId) => {
    console.log("delete product ", productId);
    dispatch(deleteProduct(productId));
  };

  return (
    <Box width={"100%"}>
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.category}
                label="Category"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"golf"}>Adidas Golf</MenuItem>
                <MenuItem value={"gym"}>Adidas Gym</MenuItem>
                <MenuItem value={"hiking"}>Adidas Hiking</MenuItem>
                <MenuItem value={"running"}>Adidas Running</MenuItem>
                <MenuItem value={"soccer"}>Adidas Soccer</MenuItem>
                <MenuItem value={"chuck_70"}>Converse Chuck 70</MenuItem>
                <MenuItem value={"classic_chuck"}>
                  Converse Classic Chuck
                </MenuItem>
                <MenuItem value={"air_force_1"}>Nike Air Force 1</MenuItem>
                <MenuItem value={"air_max"}>Nike Air Max</MenuItem>
                <MenuItem value={"basketball"}>Nike Basketball</MenuItem>
                <MenuItem value={"jordan"}>Nike Jordan</MenuItem>
                <MenuItem value={"life_style"}>Nike Lifestyle</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Availability
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.availability}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"in_stock"}>Instock</MenuItem>
                <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sort By Price
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>Heigh - Low</MenuItem>
                <MenuItem value={"price_low"}>Low - Heigh</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card className="mt-2">
        <CardHeader
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ flex: 1 }}>All Products</span>
              <Button
                onClick={() => navigate("/admin/product/create")}
                variant="contained"
                color="primary"
              >
                Create Product
              </Button>
            </div>
          }
          sx={{ pt: 2, "& .MuiCardHeader-action": { mt: 0.6 } }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>QR CODE</TableCell>
                <TableCell>BAR CODE</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                {/* <TableCell sx={{ textAlign: "center" }}>Category</TableCell> */}
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  Discounted Price
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
                {/* <TableCell sx={{ textAlign: "center" }}>Delete</TableCell> */}
                <TableCell sx={{ textAlign: "center" }}>Reviews</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersProduct?.products?.content?.map((item) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    {item.id && (
                      <QRCode
                        size={140}
                        bgColor="white"
                        fgColor="black"
                        // value={`http://localhost:3000/product/${item.id}`}
                        value={`https://www.nike.com/t/air-jordan-xxxvii-low-basketball-shoes-00ZHpg/DQ4122-007`}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <Barcode
                      style={{ width: '50px', height: 'auto' }} 
                      value={item.id} 
                    />
                  </TableCell>

                  <TableCell>
                    {" "}
                    <Avatar 
                      alt={item.title} 
                      src={item.imageUrl} 
                      style={{ width: '100px', height: '100px' }} 
                      />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>
                    {item.category.name}
                  </TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.price}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.discountedPrice}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.quantity}
                  </TableCell>
                  <TableCell style={{}} sx={{ textAlign: "center" }}>
                    <Button
                      onClick={() =>
                        navigate(`/admin/product/update/${item.id}`)
                      }
                      variant="text"
                      color="warning"
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant="text"
                      onClick={() => handleDeleteProduct(item.id)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </Button>

                  </TableCell>
                  {/* <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="text"
                      onClick={() => handleDeleteProduct(item.id)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell> */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      onClick={() =>
                        navigate(`/admin/product/reviews/${item.id}`)
                      }
                      variant="text"
                      color="success"
                    >
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 border">
        {/* <Pagination
          className="py-5 border w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        /> */}

        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={customersProduct.products?.totalPages}
            color="primary"
            className=""
            onChange={handlePaginationChange}
            // value={page}
          />
        </div>
      </Card>
    </Box>
  );
};

export default ProductsTable;
