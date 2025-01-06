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

export default function RagasOrder() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAPICall("/api/ragasOrder");
        const sortedOrders = response.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = orders.filter(
      (order) =>
        order.name?.toLowerCase().includes(lowercasedTerm) ||
        order.email?.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  return (
    <div style={{ padding: "16px" }}>
      <h1 style={{ textAlign: "center" }}>Orders</h1>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name or Email"
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
      <div
        style={{
          maxHeight: "400px",
          overflow: "auto",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <CTable hover bordered>
          <CTableHead
            style={{
              position: "sticky",
              top: 0,
              background: "#f8f9fa",
              zIndex: 1,
            }}
          >
            <CTableRow>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Mobile</CTableHeaderCell>
              <CTableHeaderCell>Delivery Address</CTableHeaderCell>
              <CTableHeaderCell>Product Name</CTableHeaderCell>
              <CTableHeaderCell>Product Price</CTableHeaderCell>
              <CTableHeaderCell>Weight</CTableHeaderCell>
              <CTableHeaderCell>Quantity</CTableHeaderCell>
              <CTableHeaderCell>UPI Transaction Id</CTableHeaderCell>
              <CTableHeaderCell>Message</CTableHeaderCell>
              <CTableHeaderCell>Payment Image</CTableHeaderCell>
              <CTableHeaderCell>Order Status</CTableHeaderCell>
              <CTableHeaderCell>Submitted At</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredOrders.map((order, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{order.name || "N/A"}</CTableDataCell>
                <CTableDataCell>{order.email || "N/A"}</CTableDataCell>
                <CTableDataCell>{order.mobileNumber || "N/A"}</CTableDataCell>
                <CTableDataCell>
                  {order.delivery_address || "N/A"}
                </CTableDataCell>
                <CTableDataCell>{order.product_name || "N/A"}</CTableDataCell>
                <CTableDataCell>
                  {order.product_price ? `$${order.product_price}` : "N/A"}
                </CTableDataCell>
                <CTableDataCell>{order.weight_type || "N/A"}</CTableDataCell>
                <CTableDataCell>{order.number_qty || "N/A"}</CTableDataCell>
                <CTableDataCell>
                  {order.upi_transaction_id || "N/A"}
                </CTableDataCell>
                <CTableDataCell>{order.message || "N/A"}</CTableDataCell>
                <CTableDataCell>
                  {order.payment_image ? (
                    <img
                      src={order.payment_image}
                      alt="Payment"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </CTableDataCell>
                <CTableDataCell>{order.status || "N/A"}</CTableDataCell>
                <CTableDataCell>
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString("en-GB")
                    : "N/A"}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
  );
}
