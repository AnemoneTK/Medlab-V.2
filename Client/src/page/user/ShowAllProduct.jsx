import Axios from "axios";
import { useEffect, useState } from "react";

import '../../components/card.css'

export function ShowAllProduct() {
  const [product, setProduct] = useState([]);
  const localhost = "http://localhost:3000"

  const getProduct = async () => {
    return new Promise((resolve, reject) => {
      Axios.get(localhost+"/product").then((response) => {
        resolve(response.data);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((response)=>{
        reject([])
      })
    });
  };

  useEffect(() => {
    getProduct().then((data)=>{
      setProduct(data)
    })
    .catch((data)=>{
      console.log(data)
    })
  }, []);

  return (
    <>
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
                  <h3 className="card-title">รายการยา</h3>
                </div>

                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th className="text-center">รหัสยา</th>
                        <th>ชื่อ</th>
                        <th>ชนิด</th>
                        <th className="text-center">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td className="col-1 text-center">{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.type}</td>
                            <td className="col-1 text-center p-0">
                                <button className="btn btn-primary col-6 rounded-0 h-100"><i className="bi bi-pencil-square"></i></button>
                                <button className="btn btn-danger col-6 rounded-0"><i className="bi bi-trash"></i></button>
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
