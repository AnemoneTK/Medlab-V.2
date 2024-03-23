import Axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../components/card.css";
import Swal from "sweetalert2";

export function ShowAllProduct() {
  const [product, setProduct] = useState([]);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const localhost = "http://localhost:3000";

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

  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState(0);
  const [type, setType] = useState(0);
  const [category, setCategory] = useState(0);
  const [detail, setDetail] = useState("");
  const [direction, setDirection] = useState("");

  const [unitSelect, setUnitSelect] = useState([]);
  const [typeSelect, setTypeSelect] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  const addNewProduct = (e) => {
    e.preventDefault();
    const jsonData = {
      id: id,
      name: name,
      unit: unit,
      type: type,
      category: category,
      detail: detail,
      direction: direction,
    };
    fetch("http://localhost:3000/checkProductID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[0].countID != 0) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "รหัสยานี้ถูกเพิ่มแล้ว",
            showConfirmButton: true,
          });
        } else {
          fetch("http://localhost:3000/addNewProduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "success") {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "เพิ่มยา สำเร็จ!",
                  showConfirmButton: true,
                  showCancelButton: true,
                  cancelButtonColor: "#d33",
                  confirmButtonText: "เพิ่มรายการ",
                  cancelButtonText: "ปิด",
                }).then((result) => {
                  if (!result.isConfirmed) {
                    window.location.reload(false);
                  } else {
                    setID("");
                    setName("");
                    setUnit(0);
                    setType(0);
                    setCategory(0);
                    setDetail("");
                    setDirection("");
                  }
                });
              } else {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "กรุณากรอกข้อมูลให้ครบถ้วน",
                  showConfirmButton: true,
                });
              }
            });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  //get unit data to show at select option
  useEffect(() => {
    fetch(localhost + "/getUnit")
      .then((data) => data.json())
      .then((unit) => setUnitSelect(unit));
  }, []);

  //get type data to show at select option
  useEffect(() => {
    fetch(localhost + "/getType")
      .then((data) => data.json())
      .then((type) => setTypeSelect(type));
  }, []);

  //get category data to show at select option
  useEffect(() => {
    fetch(localhost + "/getCategory")
      .then((data) => data.json())
      .then((category) => setCategorySelect(category));
  }, []);
  return (
    <>
      {/* Modal add new product */}
      <Modal show={showAddProduct} onHide={()=>setShowAddProduct(false)}>
        <Modal.Header closeButton>
          <Modal.Title>สร้างรายการยาใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>รหัสยา</label>
                    <input
                      type="number"
                      name="p_id"
                      className="form-control"
                      placeholder="รหัสยา"
                      value={id}
                      required
                      onChange={(event) => {
                        setID(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>ชื่อ</label>
                    <input
                      type="text"
                      name="p_name"
                      className="form-control"
                      placeholder="ชื่อยา"
                      value={name}
                      required
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>หน่วย</label>
                    <select
                      name="p_type"
                      className="form-control select2"
                      value={unit}
                      required
                      onChange={(event) => {
                        setUnit(event.target.value);
                      }}
                    >
                      <option value="">เลือก</option>
                      {unitSelect.map((unit, i) => (
                        <option key={i} value={unit.unit_id}>
                          {unit.unit_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>ชนิด</label>
                    <select
                      name="p_type"
                      className="form-control select2"
                      value={type}
                      required
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                    >
                      <option value="">เลือก</option>
                      {typeSelect.map((type, i) => (
                        <option key={i} value={type.type_id}>
                          {type.type_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>ประเภท</label>
                    <select
                      name="p_type"
                      className="form-control select2"
                      value={category}
                      required
                      onChange={(event) => {
                        setCategory(event.target.value);
                      }}
                    >
                      <option value="">เลือก</option>
                      {categorySelect.map((category, i) => (
                        <option key={i} value={category.category_id}>
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>รายละเอียด</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter ..."
                      value={detail}
                      required
                      onChange={(event) => {
                        setDetail(event.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>วิธีใช้</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter ..."
                      value={direction}
                      required
                      onChange={(event) => {
                        setDirection(event.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-lg btn-success w-100 fw-bold"
                      onClick={addNewProduct}
                    >
                      สร้างรายการยาใหม่
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={addNewProduct}>
            Save
          </Button>
        </Modal.Footer> */}
      </Modal>

      {/* Modal show product detail */}
      <Modal show={showDetail} onHide={()=>setShowDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียด</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>รหัสยา</label>
                    <input
                      type="number"
                      name="p_id"
                      className="form-control"
                      placeholder="รหัสยา"
                      value={id}
                      required
                      onChange={(event) => {
                        setID(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>ชื่อ</label>
                    <input
                      type="text"
                      name="p_name"
                      className="form-control"
                      placeholder="ชื่อยา"
                      value={name}
                      required
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>หน่วย</label>
                    <select
                      name="p_type"
                      className="form-control select2"
                      value={unit}
                      required
                      onChange={(event) => {
                        setUnit(event.target.value);
                      }}
                    >
                      <option value="">เลือก</option>
                      {unitSelect.map((unit, i) => (
                        <option key={i} value={unit.unit_id}>
                          {unit.unit_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>ชนิด</label>
                    <select
                      name="p_type"
                      className="form-control select2"
                      value={type}
                      required
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                    >
                      <option value="">เลือก</option>
                      {typeSelect.map((type, i) => (
                        <option key={i} value={type.type_id}>
                          {type.type_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>ประเภท</label>
                    <select
                      name="p_type"
                      className="form-control select2"
                      value={category}
                      required
                      onChange={(event) => {
                        setCategory(event.target.value);
                      }}
                    >
                      <option value="">เลือก</option>
                      {categorySelect.map((category, i) => (
                        <option key={i} value={category.category_id}>
                          {category.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>รายละเอียด</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter ..."
                      value={detail}
                      required
                      onChange={(event) => {
                        setDetail(event.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>วิธีใช้</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter ..."
                      value={direction}
                      required
                      onChange={(event) => {
                        setDirection(event.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-lg btn-success w-100 fw-bold"
                      onClick={addNewProduct}
                    >
                      สร้างรายการยาใหม่
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={addNewProduct}>
            Save
          </Button>
        </Modal.Footer> */}
      </Modal>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">รายการยาทั้งหมด</h1>
            </div>
          </div>
        </div>
      </div>

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
                      onClick={()=>setShowAddProduct(true)}
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
                          <tr key={product.id} onClick={()=>setShowDetail(true)}>
                            <td className="col-1 text-center">{product.id}</td>
                            <td>{product.name}</td>
                            <td >{product.type_name}</td>
                            <td >{product.category_name}</td>
                            <td className="col-lg-1 col-md-2 col-sm-1 text-center p-0 ">
                              <button className="btn btn-lg btn-primary col-lg-6 col-md-12 col-sm-12 rounded-0">
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
