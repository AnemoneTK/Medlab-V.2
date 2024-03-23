import Axios from "axios";
import { useEffect, useState } from "react";
import "../../components/card.css";

import "../../components/ModalProduct";
import "../../components/ModalDetail";
import { ModalProduct } from "../../components/ModalProduct";
import { ModalDetail } from "../../components/ModalDetail";

export function ShowAllProduct() {
  const [product, setProduct] = useState([]);
  const localhost = "http://localhost:3000";
  const [keyID, setKeyID] = useState("");

  const getProduct = async () => {
    return new Promise((resolve, reject) => {
      Axios.get(localhost + "/product")
        .then((response) => {
          resolve(response.data);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((response) => {
          reject([]);
        });
    });
  };

  useEffect(() => {
    getProduct()
      .then((data) => {
        setProduct(data);
      })
      .catch((data) => {
        console.log(data);
      });
  }, []);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <ModalProduct showAdd={showAddProduct} setShow={setShowAddProduct} />

      <ModalDetail
        showDetail={showDetail}
        setShow={setShowDetail}
        keyID={keyID}
      />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-inline-flex justify-content-between align-items-center w-100">
                    <h3 className="card-title">รายการยา</h3>

                    <div
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowAddProduct(true)}
                    >
                      <i className="fa-solid fa-plus me-2"></i>
                      เพิ่มรายการยาใหม่
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th className="text-center">รหัสยา</th>
                        <th>ชื่อ</th>
                        <th>ชนิด</th>
                        <th>ประเภท</th>
                        <th className="text-center ">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.map((product) => {
                        return (
                          <tr
                            key={product.id}
                            onClick={() => {
                              setShowDetail(true);
                              setKeyID(product.id);
                            }}
                          >
                            <td className="col-1 text-center">{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.type_name}</td>
                            <td>{product.category_name}</td>
                            <td className="col-lg-1 col-md-2 col-sm-1 text-center p-0 ">
                              <button
                                className="btn btn-lg btn-primary col-lg-6 col-md-12 col-sm-12 rounded-0"
                                onClick={() => {
                                  setShowDetail(true);
                                  setKeyID(product.id);
                                }}
                              >
                                <i className="bi bi-pencil-square"></i>
                              </button>
                              <button className="btn btn-lg btn-danger col-lg-6 col-md-12 col-sm-12 rounded-0">
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
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
