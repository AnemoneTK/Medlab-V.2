import Axios from "axios";
import { useEffect, useState } from "react";

import "../../../components/card.css";
import { useOutletContext } from "react-router";
import { Link } from "react-router-dom";

export function Dashboard() {
  const [product, setProduct] = useState([]);
  const localhost = "http://localhost:3000";

  const { userName } = useOutletContext();
  const [lowStock, setLowStock] = useState(0);
  const [overdue, setOverdue] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);

  const getProduct = async () => {
    return new Promise((resolve, reject) => {
      Axios.get(localhost + "/product")
        .then((response) => {
          resolve(response.data);
        })
        .catch(() => {
          reject([]);
        });
    });
  };
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
    getProduct()
      .then((data) => {
        setProduct(data);
      })
      .catch((data) => {
        console.log(data);
      });
    fetchDate();
  }, []);

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ภาพรวม {userName}</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
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

            <div className="col-12 col-sm-6 col-md-4">
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

            <div className="col-12 col-sm-6 col-md-4">
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
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">รายการยา</h3>
                </div>

                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>รหัสยา</th>
                        <th>ชื่อ</th>
                        <th>ชนิด</th>
                        <th>ประเภท</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.type_name}</td>
                            <td>{product.category_name}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
