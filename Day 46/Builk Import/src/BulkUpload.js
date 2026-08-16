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
        type: "binary"
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
      const res = await axios.post(
        "http://localhost:5000/bulk-upload",
        {
          players: data
        }
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  return (
    <div>
      <h2>Bulk Upload Cricket Players</h2>

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

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Age</th>
            <th>Image</th>
            <th>Runs</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.player_name}</td>
              <td>{item.age}</td>
              <td>{item.img}</td>
              <td>{item.runs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BulkUpload;