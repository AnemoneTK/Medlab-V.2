export function Warehouse(){
    return(
        <>
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
           <div className="col-lg-6 col-md-12 col-sm-12">
             <div className="card">
               <div className="card-header">
                 <h3 className="card-title">ตำแหน่งจัดเก็บทั้งหมด</h3>
               </div>

               <div className="card-body">
                 <table
                   id="example1"
                   className="table table-bordered table-striped"
                 >
                   <thead>
                     <tr>
                       <th>รหัส</th>
                       <th>ชื่อ</th>
                       <th>จำนวน</th>
                       <th>ที่ตั้ง</th>
                     </tr>
                   </thead>
                   <tbody>
                   <tr>
                       <td>001</td>
                       <td>A</td>
                       <td>20</td>
                       <td>A</td>
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
    )
}