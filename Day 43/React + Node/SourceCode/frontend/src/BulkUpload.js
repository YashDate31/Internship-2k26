import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function BulkUpload() {

  const [data, setData] = useState([]);

  // Read Excel File
  const handleFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {

      const workbook = XLSX.read(event.target.result, {
        type: "binary",
      });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const excelData = XLSX.utils.sheet_to_json(sheet);

      console.log(excelData);

      setData(excelData);

    };

    reader.readAsBinaryString(file);

  };

  // Upload Data
  const uploadData = async () => {

    try {
      const currentUserId = localStorage.getItem("userId");
      if (!currentUserId || currentUserId === "null" || currentUserId === "undefined") {
        alert("You must be logged in to upload products!");
        return;
      }
      
      const productsWithUserId = data.map((item) => ({
          ...item,
          user_id: currentUserId 
      }));

      const res = await axios.post(
        "http://localhost:5000/bulk-upload",
        {
          products: productsWithUserId,
        }
      );

      alert(res.data.message);

    } catch (err) {

      console.log(err);

    }

  };
return (
    <div>
      <h2>Bulk Upload</h2>

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFile}
      />
      <br /><br />
      <button onClick={uploadData}>
        Upload
      </button>
      <br /><br />
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.image}</td>
              <td>{item.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BulkUpload;

