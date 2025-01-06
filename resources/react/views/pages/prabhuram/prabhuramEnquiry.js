import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { getAPICall } from "../../../util/api";

export default function PrabhuramEnquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Fetch data
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getAPICall("/api/prabhuramEnquiry");
        console.log(response);
        setEnquiries(response);
        setFilteredEnquiries(response);
      } catch (error) {
        console.error("Error fetching enquiry data:", error);
      }
    };
    fetchEnquiries();
  }, []);

  // Search functionality
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = enquiries.filter(
      (enquiry) =>
        enquiry.name.toLowerCase().includes(lowercasedTerm) ||
        enquiry.email.toLowerCase().includes(lowercasedTerm) ||
        enquiry.mobileNumber.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredEnquiries(filtered);
  }, [searchTerm, enquiries]);

  // Sorting functionality
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedEnquiries = [...filteredEnquiries].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredEnquiries(sortedEnquiries);
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ textAlign: "center" }}>Enquiry</h1>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name, Email, or Mobile"
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
      {/* Scrollable Table */}
      <div
        style={{
          maxHeight: "400px",
          overflow: "auto",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <CTable bordered hover>
          <CTableHead
            style={{
              position: "sticky",
              top: 0,
              background: "#f8f9fa",
              zIndex: 1,
            }}
          >
            <CTableRow>
              <CTableHeaderCell
                onClick={() => handleSort("name")}
                style={{ cursor: "pointer" }}
              >
                Name
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </CTableHeaderCell>
              <CTableHeaderCell
                onClick={() => handleSort("email")}
                style={{ cursor: "pointer" }}
              >
                Email
                {sortConfig.key === "email" &&
                  (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </CTableHeaderCell>
              <CTableHeaderCell
                onClick={() => handleSort("mobileNumber")}
                style={{ cursor: "pointer" }}
              >
                Mobile
                {sortConfig.key === "mobileNumber" &&
                  (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </CTableHeaderCell>
              <CTableHeaderCell>Gender</CTableHeaderCell>
              <CTableHeaderCell
                onClick={() => handleSort("years")}
                style={{ cursor: "pointer" }}
              >
                Age
                {sortConfig.key === "years" &&
                  (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </CTableHeaderCell>
              <CTableHeaderCell
                onClick={() => handleSort("created_at")}
                style={{ cursor: "pointer" }}
              >
                Submitted
                {sortConfig.key === "created_at" &&
                  (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredEnquiries.map((enquiry, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{enquiry.name}</CTableDataCell>
                <CTableDataCell>{enquiry.email}</CTableDataCell>
                <CTableDataCell>{enquiry.mobileNumber}</CTableDataCell>
                <CTableDataCell>{enquiry.gender}</CTableDataCell>
                <CTableDataCell>{enquiry.years}</CTableDataCell>
                <CTableDataCell>
                  {new Date(enquiry.created_at).toLocaleDateString("en-GB")}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
  );
}
