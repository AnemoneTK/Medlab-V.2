import { Card, Col, Row } from "antd";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { ModalWarehouse } from "./Modal/ModalWarehouse";
import Swal from "sweetalert2";
import { ModalWarehouseDetail } from "./Modal/ModalWarehouseDetail";
import "./warehouse.css";

export function Warehouse() {
  const { addNew } = useOutletContext();
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState([]);
  const [warehouseInfo, setWarehouseInfo] = useState({});
  const localhost = "http://localhost:3000";
  const [showAdd, setShowAdd] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // for modal warehouse detail
  const [warehouseID, setWarehouseID] = useState("");
  const [warehouseName, setWarehouseName] = useState("");

  //get all warehouse to show
  const getWarehouse = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(localhost + "/getWarehouse")
        .then((response) => {
          resolve(response.data);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((response) => {
          reject([]);
        });
    });
  };

  const getWarehouseInfo = async (warehouse_id) => {
    try {
      const response = await fetch("http://localhost:3000/Warehouse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ warehouse_id: warehouse_id }),
      });
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching warehouse info:", error);
      return {}; // Return empty object on error
    }
  };

  const deleteWarehouse = (warehouse_id, warehouse_name) => {
    const jsonData = {
      warehouse_id: warehouse_id,
    };
    Swal.fire({
      position: "center",
      icon: "question",
      title: "คุณต้องการลบที่จัดเก็บ " + warehouse_name + " หรือไม่",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "ยืนยันลบรายการ",
      cancelButtonText: "ปิด",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/deleteWarehouse", {
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
                title: "ไม่สามารถลบที่จัดเก็บ " + warehouse_name + " ได้",
                showConfirmButton: true,
              });
            }
          });
      }
    });
  };

  useEffect(() => {
    getWarehouse()
      .then((data) => {
        setWarehouse(data);
      })
      .catch((data) => {
        console.log(data);
      });
  }, []);

  useEffect(() => {
    warehouse.forEach(async (wh) => {
      const info = await getWarehouseInfo(wh.warehouse_id);
      setWarehouseInfo((prev) => ({ ...prev, [wh.warehouse_id]: info }));
    });
  }, [warehouse]);

  const handleWarehouseClick = (warehouseId) => () => {
    if (
      warehouseInfo[warehouseId] &&
      warehouseInfo[warehouseId].total_locations > 0 &&
      warehouseInfo[warehouseId].total_lots > 0
    ) {
      setWarehouseID(warehouseId);
      setWarehouseName(warehouseInfo[warehouseId].warehouse_name);
      setShowDetail(true);
    }
  };
  return (
    <>
      <ModalWarehouse showAdd={showAdd} setShow={setShowAdd} />
      <ModalWarehouseDetail
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        warehouse_id={warehouseID}
        warehouse_name={warehouseName}
      />

      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ตำแหน่งจัดเก็บ</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header">
                  <div className="d-inline-flex flex-wrap justify-content-between align-items-center w-100">
                    <div className="col-md-4 col-sm-12">
                      <form className="d-flex flex-row flex-wrap justify-content-start align-items-center">
                        <input
                          className="form-control  col-md-9 col-sm-12 border-1 "
                          type="text"
                          placeholder="search"
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                      </form>
                    </div>
                    {addNew == 1 ? (
                      <div
                        className="btn btn-secondary btn-sm col-md-2 col-sm-12"
                        onClick={() => setShowAdd(true)}
                      >
                        <i className="fa-solid fa-plus me-2"></i>
                        เพิ่มตำแหน่งจัดเก็บ
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="card-body">
                  <Row gutter={16}>
                    {warehouse
                      .filter((wh) =>
                        search
                          ? wh.warehouse_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          : true
                      )
                      .map((wh) => (
                        <Col
                          span={8}
                          key={wh.warehouse_id}
                          onClick={
                            warehouseInfo[wh.warehouse_id] &&
                            handleWarehouseClick(wh.warehouse_id)
                          }
                          className={
                            warehouseInfo[wh.warehouse_id] &&
                            (warehouseInfo[wh.warehouse_id].total_lots == 0
                              ? ""
                              : "card-container")
                          }
                        >
                          <Card
                            title={
                              <>
                                <div className="row d-flex justify-content-between align-items-center p-0 m-0">
                                  <div className="col-6 p-0 m-0">
                                    {wh.warehouse_name}
                                  </div>
                                  {warehouseInfo[wh.warehouse_id] &&
                                    (warehouseInfo[wh.warehouse_id]
                                      .total_locations == 0 ? (
                                      <div className="col-6 d-flex justify-content-end p-0 m-0">
                                        <button
                                          className="btn btn-danger"
                                          onClick={() =>
                                            deleteWarehouse(
                                              wh.warehouse_id,
                                              wh.warehouse_name
                                            )
                                          }
                                        >
                                          <i className="bi bi-trash"></i>
                                        </button>
                                      </div>
                                    ) : (
                                      ""
                                    ))}
                                </div>
                              </>
                            }
                            className="border border-secondary-subtle my-2 shadow-sm hover-shadow-lg"
                            bordered={true}
                          >
                            <div className="row p-0 m-0">
                              <div className="col-2 fs-2 d-flex justify-content-start p-0 m-0">
                                <Badge
                                  bg={
                                    warehouseInfo[wh.warehouse_id] &&
                                    (warehouseInfo[wh.warehouse_id]
                                      .total_lots ==
                                      warehouseInfo[wh.warehouse_id]
                                        .total_locations &&
                                    warehouseInfo[wh.warehouse_id]
                                      .total_locations != 0
                                      ? "danger"
                                      : warehouseInfo[wh.warehouse_id]
                                          .total_locations === 0
                                      ? "secondary"
                                      : "info")
                                  }
                                  className="d-flex justify-content-center align-items-center py-3 rounded-2"
                                >
                                  {/* Display total lots in locations / total locations */}
                                  {warehouseInfo[wh.warehouse_id] && (
                                    <>
                                      {warehouseInfo[wh.warehouse_id]
                                        .total_lots === 0 &&
                                      warehouseInfo[wh.warehouse_id]
                                        .total_locations > 0 ? (
                                        <div>
                                          0 /{" "}
                                          {
                                            warehouseInfo[wh.warehouse_id]
                                              .total_locations
                                          }
                                        </div>
                                      ) : warehouseInfo[wh.warehouse_id]
                                          .total_locations == "0" ? (
                                        <div>0 / 0</div>
                                      ) : (
                                        <>
                                          {
                                            warehouseInfo[wh.warehouse_id]
                                              .total_lots
                                          }{" "}
                                          /{" "}
                                          {
                                            warehouseInfo[wh.warehouse_id]
                                              .total_locations
                                          }
                                        </>
                                      )}
                                    </>
                                  )}
                                </Badge>
                              </div>
                              <div className="row col-8 fs-2 ms-5  p-0 d-flex justify-content-start align-items-center  ">
                                <div
                                  className="col-8 text-center"
                                  style={{ fontSize: "1.2rem" }}
                                >
                                  ยาใกล้หมดอายุ
                                </div>
                                <div
                                  className={`col-md-3 p-0 m-0 ${
                                    warehouseInfo[wh.warehouse_id] &&
                                    warehouseInfo[wh.warehouse_id]
                                      .total_lots_before_date === 0
                                      ? "fs-4 text-center"
                                      : "fw-bolder fs-2 text-center bg-danger round rounded-1"
                                  }`}
                                >
                                  {warehouseInfo[wh.warehouse_id] &&
                                    warehouseInfo[wh.warehouse_id]
                                      .total_lots_before_date}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
