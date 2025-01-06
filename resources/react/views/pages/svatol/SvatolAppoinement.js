import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React, { useEffect, useState, useMemo } from "react";
import { getAPICall } from "../../../util/api";

export default function SvatolAppoinement() {
  const [Appoinement, setAppoinement] = useState([]);
  const [filteredAppoinement, setFilteredAppoinement] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Fetch Data
  useEffect(() => {
    const fetchAppoinements = async () => {
      try {
        const response = await getAPICall("/api/svatolAppoinement");
        setAppoinement(response);
        setFilteredAppoinement(response); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching appoinement data:", error);
      }
    };
    fetchAppoinements();
  }, []);

  // Filter Data based on Search Term
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = Appoinement.filter((item) =>
      item.name.toLowerCase().includes(lowercasedTerm)||
      item.email.toLowerCase().includes(lowercasedTerm)||
      item.mobile.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredAppoinement(filtered);
  }, [searchTerm, Appoinement]);

  // Table Headers
  const tableHeaders = useMemo(
    () => [
      { name: "Name", key: "name" },
      { name: "Email", key: "email" },
      { name: "Mobile", key: "mobile" },
      { name: "Treatment Type", key: "treatement_type" },
      { name: "Time", key: "time" },
      { name: "Date", key: "date" },
    ],
    []
  );

  // Sorting Function
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedAppoinements = [...filteredAppoinement].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredAppoinement(sortedAppoinements);
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ textAlign: "center" }}>Appointments</h1>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name,Email, or Mobile"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {/* Scrollable Table Container */}
      <div style={{ maxHeight: "250px", overflow: "auto" }}>
        <CTable bordered hover>
          <CTableHead style={{ position: "sticky", top: 0, background: "#f8f9fa", zIndex: 1 }}>
            <CTableRow>
              {tableHeaders.map((header) => (
                <CTableHeaderCell
                  key={header.key}
                  onClick={() => handleSort(header.key)}
                  style={{ cursor: "pointer" }}
                >
                  {header.name}
                  {sortConfig.key === header.key && (
                    <span>{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}</span>
                  )}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredAppoinement.map((appoinement, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{appoinement.name}</CTableDataCell>
                <CTableDataCell>{appoinement.email}</CTableDataCell>
                <CTableDataCell>{appoinement.mobile}</CTableDataCell>
                <CTableDataCell>{appoinement.treatement_type}</CTableDataCell>
                <CTableDataCell>{appoinement.time}</CTableDataCell>
                <CTableDataCell>
                  {new Date(appoinement.date).toLocaleDateString("en-GB")}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
  );
}
