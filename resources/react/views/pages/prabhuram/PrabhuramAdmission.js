import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import React, { useEffect, useMemo, useState } from "react";
import { getAPICall } from "../../../util/api";

export default function PrabhuramAdmission() {
  const [admissions, setAdmissions] = useState([]);
  const [filteredAdmissions, setFilteredAdmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Fetch data from backend when the component mounts
  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const response = await getAPICall("/api/prabhuramAdmission");
        console.log(response);
        setAdmissions(response); // Update state with fetched admissions
        setFilteredAdmissions(response); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching admission data:", error);
      }
    };
    fetchAdmissions();
  }, []);

  // Filter data based on search term
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = admissions.filter(
      (admission) =>
        admission.studentName.toLowerCase().includes(lowercasedTerm) ||
        admission.email.toLowerCase().includes(lowercasedTerm) ||
        admission.mobileNumber.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredAdmissions(filtered);
  }, [searchTerm, admissions]);

  // Table headers
  const tableHeaders = useMemo(
    () => [
      { name: "Name", key: "studentName" },
      { name: "Email", key: "email" },
      { name: "Mobile", key: "mobileNumber" },
      { name: "Gender", key: "gender" },
      { name: "Blood Group", key: "bloodGroup" },
      { name: "Standard", key: "standard" },
      { name: "Address", key: "address" },
      { name: "Parent Name", key: "parentName" },
      { name: "Parent Occupation", key: "parentOccupation" },
      { name: "Health Instructions", key: "healthInstructions" },
      { name: "Student Image", key: "" }, // No sorting needed for images
      { name: "Birth Certificate", key: "" }, // No sorting needed for images
      { name: "Aadhar Card", key: "" }, // No sorting needed for images
      { name: "Submitted", key: "created_at" },
    ],
    []
  );

  // Sorting function
  const handleSort = (key) => {
    if (!key) return; // Skip sorting for non-sortable columns
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sortedAdmissions = [...filteredAdmissions].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredAdmissions(sortedAdmissions);
    setSortConfig({ key, direction });
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ textAlign: "center" }}>Admission Data</h1>
      {/* Search Bar */}
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
      {/* Table Container */}
      <div
        style={{
          maxHeight: "500px",
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
              {tableHeaders.map((header) => (
                <CTableHeaderCell
                  key={header.key}
                  onClick={() => handleSort(header.key)}
                  style={{ cursor: header.key ? "pointer" : "default" }}
                >
                  {header.name}
                  {sortConfig.key === header.key && (
                    <span>
                      {sortConfig.direction === "asc" ? " 🔼" : " 🔽"}
                    </span>
                  )}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredAdmissions.map((admission, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{admission.studentName}</CTableDataCell>
                <CTableDataCell>{admission.email}</CTableDataCell>
                <CTableDataCell>{admission.mobileNumber}</CTableDataCell>
                <CTableDataCell>{admission.gender}</CTableDataCell>
                <CTableDataCell>{admission.bloodGroup}</CTableDataCell>
                <CTableDataCell>{admission.standard}</CTableDataCell>
                <CTableDataCell>{admission.address}</CTableDataCell>
                <CTableDataCell>{admission.parentName}</CTableDataCell>
                <CTableDataCell>{admission.parentOccupation}</CTableDataCell>
                <CTableDataCell>{admission.healthInstructions}</CTableDataCell>
                <CTableDataCell>
                  <img
                    src={admission.studentImage}
                    alt="Student"
                    style={{ maxWidth: "100px" }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <img
                    src={admission.birthCertificate}
                    alt="Birth Certificate"
                    style={{ maxWidth: "100px" }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <img
                    src={admission.Aadharcard}
                    alt="Aadhar Card"
                    style={{ maxWidth: "100px" }}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  {new Date(admission.created_at).toLocaleDateString("en-GB")}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
  );
}
