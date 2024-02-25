export function Dashboard() {
  return (
    <>
    
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">ภาพรวม</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4">
          <div className="info-box">
            <span className="info-box-icon bg-info elevation-1"><i className="fa-solid fa-tablets"></i></span>
            <div className="info-box-content">
              <a href="./product/showAllProduct.php">
                <span className="info-box-text">ยาทั้งหมดในคลัง <small>คลิกเพื่อดูรายละเอียด</small></span>
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-success elevation-1"><i className="fa-solid fa-box"></i></span>
            <div className="info-box-content">
              <a href="./print/showStock.php" >
                <span className="info-box-text">ยาเหลือน้อย <small>คลิกเพื่อดูรายละเอียด</small></span>
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-warning elevation-1"><i className="fa-solid fa-calendar-days"></i></span>
            <div className="info-box-content">
              <a href="./print/showEXP.php">
                <span className="info-box-text">ยาใกล้หมดอายุ <small>คลิกเพื่อดูรายละเอียด</small></span>
              </a>
            </div>
          </div>
        </div>



      </div>
    </div>
  </section>



  <section className="content">
    <div className="container-fluid">

      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <figure className="highcharts-figure">
            <div id="chart-container"></div>
          </figure>
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">รายการยา</h3>
            </div>

            <div className="card-body">
              <table id="example1" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>รหัสยา</th>
                    <th>ชื่อ</th>
                    <th>จำนวน</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>A</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>A</td>
                        <td>12</td>
                    </tr>
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
