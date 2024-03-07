export function AddNewProduct() {
  return (
    <div className="content">
      <div className="container-fluid row">
        <div className="col-md-6">
          <div className="card-primary w-20">
            <div className="card-header">
              <div className="d-inline-flex justify-content-between align-items-center w-100">
                <h3 className="card-title">สร้างรายการยาใหม่</h3>

                <div className="btn-menu">
                  <a
                    href="../warehouse/warehouse.php"
                    className="btn btn-secondary btn-sm"
                  >
                    <i className="fa-solid fa-plus"></i>
                    เพิ่มตำแหน่งจัดเก็บ
                  </a>
                </div>
              </div>
            </div>

            <form
              action="../method/insertProduct.php"
              method="POST"
              id="createNewProduct"
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>รหัสยา</label>
                      <input
                        type="text"
                        name="p_id"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="รหัสยา"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>ชื่อ</label>
                      <input
                        type="text"
                        name="p_name"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="ชื่อยา"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label>ชนิด</label>
                      <select
                        name="p_type"
                        className="form-control select2"
                        required
                      >
                        <option selected="selected" value="">
                          เลือกประเภท
                        </option>
                        <option value="ยาน้ำ">ยาน้ำ</option>
                        <option value="ยาเม็ด">ยาเม็ด</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label>ประเภท</label>
                      <select
                        name="p_type"
                        className="form-control select2"
                        required
                      >
                        <option selected="selected" value="">
                          เลือกประเภท
                        </option>
                        <option value="ยาทั่วไป">ยาทั่วไป</option>
                        <option value="ยาอันตราย">ยาอันตราย</option>
                      </select>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <div className="form-group">
                        <button
                          type="submit"
                          name="submit"
                          className="btn btn-primary w-100"
                        >
                          ยืนยัน
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
