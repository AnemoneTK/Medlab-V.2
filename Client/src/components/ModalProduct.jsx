export function ModalProduct(){
    return(
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

        </>
    )
} 