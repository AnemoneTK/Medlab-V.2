// import { Axios } from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

export function ModalDetail(props) {
  const localhost = "http://localhost:3000";

  const id = props.keyID;
  const withdraw = props.withdraw
  const [name, setName] = useState("");
  const [lowStock, setLowStock] = useState(50);
  const [unit, setUnit] = useState(0);
  const [type, setType] = useState(0);
  const [category, setCategory] = useState(0);
  const [detail, setDetail] = useState("");
  const [direction, setDirection] = useState("");

  const [unitSelect, setUnitSelect] = useState([]);
  const [typeSelect, setTypeSelect] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  
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

  useEffect(()=>{
    if(id != 0){
        const jsonData = {
            id: id,
          };
        fetch("http://localhost:3000/getDetail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),})
          .then((response) => response.json())
        .then((data)=>{
           setName(()=>data[0].name)
           setLowStock(()=>data[0].low_stock)
           setUnit(()=>data[0].unit)
           setType(()=>data[0].type)
           setCategory(()=>data[0].category)
           setDetail(()=>data[0].detail)
           setDirection(()=>data[0].direction)
        })
    }
}, [id]);

const update = (e) => {
    e.preventDefault();
    const jsonData = {
      id: id,
      name: name,
      low_stock: lowStock,
      unit: unit,
      type: type,
      category: category,
      detail: detail,
      direction: direction,
    };
    fetch("http://localhost:3000/updateProduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Update",
            showConfirmButton: true,
          })
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  return (
    <>
      {/* Modal add new product */}
      <Modal show={props.showDetail} onHide={() => {props.setShow(false); }}>
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title className="fw-bolder">รายละเอียด</Modal.Title>
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
                      readOnly
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
                      readOnly = { withdraw == 1 ? false : true }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>จำนวนขั่นต่ำ</label>
                    <input
                      type="text"
                      name="p_name"
                      className="form-control"
                      placeholder="ชื่อยา"
                      value={lowStock}
                      required
                      onChange={(event) => {
                        setLowStock(event.target.value);
                      }}
                      readOnly = { withdraw == 1 ? false : true }
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
                      disabled = { withdraw == 1 ? false : true }
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
                      disabled = { withdraw == 1 ? false : true }
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
                      disabled = { withdraw == 1 ? false : true }
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
                      rows="2"
                      placeholder="Enter ..."
                      value={detail}
                      required
                      onChange={(event) => {
                        setDetail(event.target.value);
                      }}
                      readOnly = { withdraw == 1 ? false : true }
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>วิธีใช้</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Enter ..."
                      value={direction}
                      required
                      onChange={(event) => {
                        setDirection(event.target.value);
                      }}
                      readOnly = { withdraw == 1 ? false : true }

                    ></textarea>
                  </div>
                </div>
                {withdraw == 1 ? <div className="col-md-12">
                  <div className="form-group">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-lg btn-primary w-100 fw-bold"
                      onClick={update}
                    >
                      อัปเดตข้อมูล
                    </button>
                  </div>
                </div>
                : ""}
                
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
    </>
  );
}
