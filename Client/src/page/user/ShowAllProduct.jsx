import Axios from "axios";
import { useEffect, useState } from "react";
import "../../components/card.css";

import "../../components/ModalProduct";
import "../../components/ModalDetail";
import { ModalProduct } from "../../components/ModalProduct";
import { ModalDetail } from "../../components/ModalDetail";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router";

export function ShowAllProduct() {
  const {withdraw} = useOutletContext();

  const [product, setProduct] = useState([]);
  const localhost = "http://localhost:3000";
  const [keyID, setKeyID] = useState("");
  // var username = sessionStorage.getItem("username");

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

  const deleteProduct = (keyID) => {
    const jsonData = {
      id: keyID,
    };
    Swal.fire({
      position: "center",
      icon: "question",
      title: "คุณต้องการลบยารหัส " + keyID + " หรือไม่",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ยืนยันลบรายการ",
      cancelButtonText: "ปิด",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/removeProduct", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              window.location.reload(false);
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "ไม่สามารถลบยารหัส " + keyID + " ได้",
                showConfirmButton: true,
              });
            }
          });
      }
    });
  };

  const [search, setSearch] = useState("");

  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">รายการยาทั้งหมด</h1>
            </div>
          </div>
        </div>
      </div>

      <ModalProduct showAdd={showAddProduct} setShow={setShowAddProduct} />

      <ModalDetail
        showDetail={showDetail}
        setShow={setShowDetail}
        keyID={keyID}
        withdraw={withdraw}
      />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-inline-flex flex-wrap justify-content-between align-items-center w-100">
                    <div className="col-md-4 col-sm-12">
                      <form className="d-flex flex-row flex-wrap justify-content-start align-items-center">
                        <input
                          className="form-control col-md-9 col-sm-12 border-1 fs-5"
                          type="text"
                          placeholder="search"
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                      </form>
                    </div>
                    {withdraw == 1 ? (
                      <div
                        className="btn btn-secondary col-md-2 col-sm-12"
                        onClick={() => setShowAddProduct(true)}
                      >
                        <i className="fa-solid fa-plus me-2"></i>
                        เพิ่มรายการยาใหม่
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="card-body">
                  <table
                    id="example2"
                    className="table table-bordered table-hover"
                  >
                    <thead>
                      <tr>
                        <th className="text-center">รหัสยา</th>
                        <th>ชื่อ</th>
                        <th>ชนิด</th>
                        <th>ประเภท</th>
                        {withdraw == 1 ? (
                          <th className="text-center ">การจัดการ</th>
                        ) : (
                          ""
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {product
                        .filter((product) => {
                          return search.toLowerCase() == ""
                            ? product
                            : product.id.toLowerCase().includes(search) ||
                                product.name.toLowerCase().includes(search);
                        })
                        .map((product) => {
                          return (
                            <tr key={product.id}>
                              <td
                                className="col-1 text-center"
                                onClick={() => {
                                  setShowDetail(true);
                                  setKeyID(product.id);
                                }}
                              >
                                {product.id}
                              </td>
                              <td
                                onClick={() => {
                                  setShowDetail(true);
                                  setKeyID(product.id);
                                }}
                              >
                                {product.name}
                              </td>
                              <td
                                onClick={() => {
                                  setShowDetail(true);
                                  setKeyID(product.id);
                                }}
                              >
                                {product.type_name}
                              </td>
                              <td
                                onClick={() => {
                                  setShowDetail(true);
                                  setKeyID(product.id);
                                }}
                              >
                                {product.category_name}
                              </td>
                              {withdraw == 1 ? (
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
                                  <button
                                    className="btn btn-lg btn-danger col-lg-6 col-md-12 col-sm-12 rounded-0"
                                    onClick={() => {
                                      deleteProduct(product.id);
                                    }}
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </td>
                              ) : (
                                ""
                              )}
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
