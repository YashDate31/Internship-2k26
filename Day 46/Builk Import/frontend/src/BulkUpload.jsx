import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

function BulkUpload() {
  const [data, setData] = useState([]);

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

      setData(excelData);
    };

    reader.readAsBinaryString(file);
  };

  const uploadData = async () => {
    try {
      const res = await axios.post("http://localhost:5000/bulk-upload", {
        players: data
      });

      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  return (
    <div className="card">
      <div className="hero">
        <p className="eyebrow">Bulk Import</p>
        <h1>Cricket Players Upload</h1>
        <p className="subtitle">
          Upload an Excel file, preview the rows, and push them to MySQL in one click.
        </p>
      </div>

      <div className="controls">
        <input
          className="file-input"
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFile}
        />
        <button className="primary-btn" onClick={uploadData} disabled={!data.length}>
          Upload to Database
        </button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Age</th>
              <th>Image</th>
              <th>Runs</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.player_name ?? "-"}</td>
                  <td>{item.age ?? "-"}</td>
                  <td>{item.img ?? "-"}</td>
                  <td>{item.runs ?? "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-state">
                  No file loaded yet. Choose a spreadsheet to preview the players here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BulkUpload;
