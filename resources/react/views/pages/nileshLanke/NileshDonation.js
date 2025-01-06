import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { getAPICall } from '../../../util/api';

export default function NileshDonation() {
  const [Donation, setDonation] = useState([]);
  const [filteredDonation, setFilteredDonation] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await getAPICall('/api/nileshDonation');
        setDonation(response);
        setFilteredDonation(response); // Set initial donation data
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    fetchDonation();
  }, []);

  // Filter donation data based on search term
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = Donation.filter(
      (donation) =>
        donation.name.toLowerCase().includes(lowercasedTerm) ||
        donation.mobile.toLowerCase().includes(lowercasedTerm) ||
        donation.address.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredDonation(filtered);
  }, [searchTerm, Donation]);

  // Sorting Function
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedDonation = [...filteredDonation].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredDonation(sortedDonation);
    setSortConfig({ key, direction });
  };

  // Table Headers
  const tableHeaders = useMemo(
    () => [
      { name: 'Name', key: 'name' },
      { name: 'Mobile', key: 'mobile' },
      { name: 'Address', key: 'address' },
      { name: 'Amount', key: 'amount' },
      { name: 'Payment Image', key: 'fileName' },
      { name: 'UPI Transaction Id', key: 'upi_transaction_id' },
      { name: 'Submitted At', key: 'created_at' },
    ],
    []
  );

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center' }}>Donation</h1>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name, Mobile, or Address"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      {/* Table Container with Scrollbar */}
      <div
        style={{
          maxHeight: '400px', // Set height to 400px
          overflow: 'auto',   // Enables scrollbar
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <CTable bordered hover>
          <CTableHead
            style={{
              position: 'sticky',
              top: 0,
              background: '#f8f9fa',
              zIndex: 1,
            }}
          >
            <CTableRow>
              {tableHeaders.map((header) => (
                <CTableHeaderCell
                  key={header.key}
                  onClick={() => handleSort(header.key)}
                  style={{ cursor: 'pointer' }}
                >
                  {header.name}
                  {sortConfig.key === header.key && (
                    <span>{sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'}</span>
                  )}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredDonation.map((donation, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{donation.name}</CTableDataCell>
                <CTableDataCell>{donation.mobile}</CTableDataCell>
                <CTableDataCell>{donation.address}</CTableDataCell>
                <CTableDataCell>{donation.amount}</CTableDataCell>
                <CTableDataCell>{donation.fileName}</CTableDataCell>
                <CTableDataCell>{donation.upi_transaction_id}</CTableDataCell>
                <CTableDataCell>
                  {new Date(donation.created_at).toLocaleDateString('en-GB')}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
  );
}
