import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
export function Purchase() {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ใบสั่งซื้อยา</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex">
        <section className="content col-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">รายการยา</h3>
                  </div>
                  <div className="card-body">
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>รหัสยา</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="รหัสยาที่ต้องการสั่งซื้อ"
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom02"
                        >
                          <Form.Label>ชื่อยา</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ชื่อยา"
                            readOnly
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom01"
                        >
                          <Form.Label>หน่วย</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="หน่วย"
                            readOnly
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom01"
                        >
                          <Form.Label>ชนิด</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ชนิด"
                            readOnly
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom01"
                        >
                          <Form.Label>ประเภท</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ประเภท"
                            readOnly
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustomUsername"
                        >
                          <Form.Label>จำนวน</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type="number"
                              placeholder="จำนวนที่ต้องการสั่งซื้อ"
                              required
                            />
                          </InputGroup>
                        </Form.Group>
                      </Row>
                      <Button
                        className="col-12 fs-5 fw-bolder mt-4"
                        type="submit"
                      >
                        เพิ่มรายการ
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content col">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">รายการคำสั่งซื้อ</h3>
                  </div>

                  <div className="card-body">
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th className="col-1 text-center">รหัสยา</th>
                          <th>ชื่อ</th>
                          <th className="col-2 text-center">ชนิด</th>
                          <th className="col-2 text-center">ประเภท</th>
                          <th className="col-1 text-center">จำนวน</th>
                          <th className="col-2 ">หน่วย</th>
                          <th className="col-1 "></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="col-1 text-center">001</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td className="col-1 text-center">1</td>
                          <td className="col-2 ">หน่วย</td>
                          <td className="col-1 p-0 m-0">
                            <button className="btn btn-lg btn-danger  col-md-12 col-sm-12 rounded-0">
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
