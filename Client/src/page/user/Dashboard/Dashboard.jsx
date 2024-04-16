import Axios from "axios";
import { useEffect, useState } from "react";

import "../../../components/card.css";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Chart } from "./Chart";

export function Dashboard() {
  const [product, setProduct] = useState([]);
  const localhost = "http://localhost:3000";
  const [lowStock, setLowStock] = useState(0);
  const [overdue, setOverdue] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [quantity, setQuantity] = useState({});

  const getProduct = async () => {
    try {
      const response = await Axios.get(localhost + "/product");
      return response.data;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return [];
    }
  };

  const getQuantity = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/getQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching quantity data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getProduct();
        setProduct(productData);

        // Fetch quantities for each product
        const quantityData = await Promise.all(
          productData.map((product) => getQuantity(product.id))
        );

        const quantityObj = {};
        quantityData.forEach((quantity, index) => {
          quantityObj[productData[index].id] = quantity;
        });

        setQuantity(quantityObj);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  const fetchDate = async () => {
    try {
      const response = await fetch("http://localhost:3000/inventorySummary");
      const data = await response.json();
      if (data.status === "success") {
        setLowStock(data.low_stock_count);
        setOverdue(data.overdue_lot_count);
        setTotalProduct(data.total_product_count);
      }
    } catch (error) {
      console.error("Error fetching purchase history:", error);
    }
  };

  useEffect(() => {
    fetchDate();
  }, []);

  // Render the table only when both product and quantity data are available
  if (product.length === 0 || Object.keys(quantity).length === 0) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ภาพรวม</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <div className="info-box">
                <span className="info-box-icon bg-info elevation-1">
                  <i className="fa-solid fa-tablets"></i>
                </span>
                <Link to="/user/allProduct" className="info-box-content">
                  <span className="info-box-text">
                    ยาทั้งหมดในคลัง <small>คลิกเพื่อดูรายละเอียด</small>
                  </span>
                  <span className="info-box-number fs-5">{totalProduct}</span>
                </Link>
              </div>
            </div>

            <div className="col-sm-12  col-md-4">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-success elevation-1">
                  <i className="fa-solid fa-box"></i>
                </span>
                <Link to="/user/quantity" className="info-box-content">
                  <span className="info-box-text">
                    ยาเหลือน้อย <small>คลิกเพื่อดูรายละเอียด</small>
                  </span>
                  <span className="info-box-number fs-5">{lowStock}</span>
                </Link>
              </div>
            </div>

            <div className="col-sm-12 col-md-4">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-warning elevation-1">
                  <i className="fa-solid fa-calendar-days"></i>
                </span>
                <div className="info-box-content">
                  <a href="./print/showEXP.php">
                    <span className="info-box-text">
                      ยาใกล้หมดอายุ <small>คลิกเพื่อดูรายละเอียด</small>
                    </span>
                    <span className="info-box-number fs-5">{overdue}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">รายการยา</h3>
                </div>
                <div
                  className="card-body p-0"
                >
                  <Chart/>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">รายการยา</h3>
                </div>
                <div
                  className="card-body p-0"
                  style={{height:"500px", maxHeight: "500px", overflowY: "auto" }}
                >
                  <Table striped>
                    <thead
                      style={{ position: "sticky", top: "0", zIndex: "1" }}
                    >
                      <tr>
                        <th>รหัสยา</th>
                        <th>ชื่อ</th>
                        <th className="text-center ">สถานะ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            {/* <td>
                              {quantity[product.id][0]?.p_quantity}{" "}
                              {product.unit_name}
                            </td> */}
                            <td
                              className="col-2"
                              style={{ fontSize: "1.2rem", zIndex: "0" }}
                            >
                              {quantity[product.id][0]?.p_quantity !== 0 &&
                              quantity[product.id][0]?.p_quantity <=
                                product.low_stock ? (
                                <Badge pill bg="warning" className="col-12">
                                  เหลือน้อย
                                </Badge>
                              ) : quantity[product.id][0]?.p_quantity === 0 ? (
                                <Badge pill bg="danger" className="col-12">
                                  หมด
                                </Badge>
                              ) : (
                                <Badge pill bg="success" className="col-12">
                                  มีของ
                                </Badge>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
