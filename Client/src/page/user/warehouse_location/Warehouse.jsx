import { Card, Col, Row } from "antd";
import Badge from "react-bootstrap/Badge";
import axios, { Axios } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { ModalWarehouse } from "./Modal/ModalWarehouse";
export function Warehouse() {
  const { addNew } = useOutletContext();
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState([]);
  const [warehouseInfo, setWarehouseInfo] = useState({});
  const localhost = "http://localhost:3000";
  const [showAdd, setShowAdd] = useState(false);

  //get all warehouse to show
  const getWarehouse = async () => {
    return new Promise((resolve, reject) => {
      axios.get(localhost + "/getWarehouse")
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
      const response = await fetch("http://localhost:3000/WarehouseInfo", {
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

  useEffect(() => {
    getWarehouse()
      .then((data) => {
        setWarehouse(data);
      })
      .catch((data) => {
        console.log(data);
      });
    
    
  }, []);

  useEffect(()=>{
    getWarehouseInfo()
      .then((data) => {
        setWarehouseInfo(data);
      })
      .catch((data) => {
        console.log(data);
      });
  },[])

  useEffect(() => {
    warehouse.forEach(async (wh) => {
      const info = await getWarehouseInfo(wh.warehouse_id);
      setWarehouseInfo((prev) => ({ ...prev, [wh.warehouse_id]: info }));
    });
  }, [warehouse]);

  return (
    <>
      <ModalWarehouse showAdd={showAdd} setShow={setShowAdd} />

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
                        <Col span={8} key={wh.warehouse_id}>
                          <Card
                            title={wh.warehouse_name}
                            className="border border-secondary-subtle my-2 shadow-sm"
                            bordered={true}
                          >
                            <div className="row p-0 m-0">
                              <div className="col-4 fs-2 d-flex justify-content-start p-0 m-0">
<<<<<<< HEAD
                                <Badge
                                  bg={
                                    warehouseInfo[wh.warehouse_id] &&
                                    (warehouseInfo[wh.warehouse_id]
                                      .total_lots_in_locations.length === 0 &&
                                    warehouseInfo[wh.warehouse_id]
                                      .total_locations > 0
                                      ? "info"
                                      : warehouseInfo[wh.warehouse_id]
                                          .total_locations === 0
                                      ? "secondary"
                                      : "danger")
                                  }
                                  className="py-3"
                                >
=======
                                <Badge bg="secondary" className="py-3">
>>>>>>> parent of e3b6604 ([ADD]-add style to badge with comdition)
                                  {/* Display total lots in locations / total locations */}
                                  {warehouseInfo[wh.warehouse_id] && (
                                    <>
                                      {warehouseInfo[wh.warehouse_id]
                                        .total_lots_in_locations.length ===
                                      0 ? (
                                        <div>0 / {
                                          warehouseInfo[wh.warehouse_id]
                                            .total_locations
                                        }</div>
                                      ) : (
                                        <>
                                          {warehouseInfo[
                                            wh.warehouse_id
                                          ].total_lots_in_locations.map(
                                            (location) => (
                                              <div key={location.location_id}>
                                                {location.total_lots} /{" "}
                                                {
                                                  warehouseInfo[wh.warehouse_id]
                                                    .total_locations
                                                }
                                              </div>
                                            )
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </Badge>
                              </div>
                              <div className="col-8 fs-2">
                                <div className="row col-12">
                                  {/* Other content here */}
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
