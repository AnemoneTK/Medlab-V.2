import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

export function ModalWarehouseDetail(props) {
  const warehouseID = props.warehouse_id;
  const warehouseName = props.warehouse_name;

  const [lot, setLot] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/WarehouseDetail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ warehouse_id: warehouseID }),
        });
        const data = await response.json();
        setLot(data); // Update the state with the fetched lot details
      } catch (error) {
        console.error("Error fetching warehouse detail:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, [lot, warehouseID]); // Fetch data whenever warehouseID prop changes

  return (
    <Modal
      show={props.showDetail}
      onHide={() => props.setShowDetail(false)}
      size="lg"
    >
      <Modal.Header closeButton className="bg-primary">
        <Modal.Title className="fw-bolder">
          ตำแหน่งจัดเก็บ {warehouseName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {lot.map((item) => (
            <li key={item.lot_id}>
              Lot ID: {item.lot_id}, Quantity: {item.quantity}, Location:{" "}
              {item.Location_name}
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}
