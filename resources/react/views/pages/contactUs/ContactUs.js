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
  
  export default function ContactUs() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  
    // Fetch data from backend when the component mounts
    useEffect(() => {
      const fetchContacts = async () => {
        try {
          const response = await getAPICall("/api/getContactUs");
          setContacts(response);
          setFilteredContacts(response);
        } catch (error) {
          console.error("Error fetching contact data:", error);
        }
      };
  
      fetchContacts();
    }, []);
  
    // Filter Data based on Search Term
    useEffect(() => {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(lowercasedTerm) ||
          contact.email.toLowerCase().includes(lowercasedTerm) ||
          contact.mobile.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredContacts(filtered);
    }, [searchTerm, contacts]);
  
    // Table Headers
    const tableHeaders = useMemo(
      () => [
        { name: "Name", key: "name" },
        { name: "Email", key: "email" },
        { name: "Mobile", key: "mobile" },
        { name: "Message", key: "message" },
        { name: "Submitted At", key: "created_at" },
      ],
      []
    );
  
    // Sorting Function
    const handleSort = (key) => {
      const direction =
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
      const sortedContacts = [...filteredContacts].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setFilteredContacts(sortedContacts);
      setSortConfig({ key, direction });
    };
  
    return (
      <div style={{ padding: "16px" }}>
        <h1 style={{ textAlign: "center" }}>Contact Us</h1>
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
            maxHeight: "300px",
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
                    style={{ cursor: "pointer" }}
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
              {filteredContacts.map((contact, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{contact.name}</CTableDataCell>
                  <CTableDataCell>{contact.email}</CTableDataCell>
                  <CTableDataCell>{contact.mobile}</CTableDataCell>
                  <CTableDataCell>{contact.message}</CTableDataCell>
                  <CTableDataCell>
                    {new Date(contact.created_at).toLocaleDateString("en-GB")}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>
      </div>
    );
  }
  