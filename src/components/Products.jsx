import React, { useEffect, useState, useContext } from "react";
import { Table } from "antd";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../contexts/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (auth.token) {
      fetchProducts();
    }
  }, [auth.token]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <div className="table-container">
      {" "}
      <Table dataSource={products} columns={columns} rowKey="id" />
    </div>
  );
};

export default Products;
