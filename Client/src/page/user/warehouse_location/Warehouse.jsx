import { Card, Col, Row } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { ModalWarehouse } from "./Modal/ModalWarehouse";
export function Warehouse() {
  const { addNew } = useOutletContext();
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState([]);
  const localhost = "http://localhost:3000";

  const [showAdd,setShowAdd] = useState(false);
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

  useEffect(() => {
    getWarehouse().then((data) => {
      setWarehouse(data);
    })
    .catch((data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
    <ModalWarehouse showAdd={showAdd} setShow={setShowAdd}/>

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
                      .filter((warehouse) => {
                        return search.toLowerCase() == ""
                          ? warehouse
                          : warehouse.warehouse_name.toLowerCase().includes(search);
                      })
                      .map((warehouse) => {
                        return (
                          <Col span={8} key={warehouse.warehouse_id}>
                            <Card
                              title={warehouse.warehouse_name}
                              className="border border-secondary-subtle my-2 shadow-sm"
                              bordered={true}
                            >
                              <div></div>
                            </Card>
                          </Col>
                        );
                      })}
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
