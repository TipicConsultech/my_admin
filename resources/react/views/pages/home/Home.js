import React, { useEffect, useState } from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardImage } from '@coreui/react';
import { storeNavData } from '../../../util/session';
import { getAPICall } from '../../../util/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [firstRoute,setFirstRoute]=useState('');
  console.log(firstRoute);

useEffect(() => {
  const fetchSideBarItems = async () => {
    try {
      const response = await getAPICall("/api/settings");
      storeNavData(response);
      console.log(response);
      
      setFirstRoute(response.data[0].to);
    } catch (error) {
      console.error("Error fetching sidebar items:", error);
    }
  };

  fetchSideBarItems();

  // Set up timer for auto-navigation
  const timer = setTimeout(() => {
    if (firstRoute) {
      navigate(firstRoute);
      console.log("Navigating to:", firstRoute);
    }
  }, 2000); // 2 seconds

  // Cleanup function to clear timer
  return () => clearTimeout(timer);
}, [navigate, firstRoute]);

  return (
   
  
    <div className="flex rounded-sm" style={{
      backgroundImage: "url('/img/background/bg3.jpg')",
      backgroundSize: "cover",
      // backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh", // Set height
      width: "100%",
    }}>
    {/* Hero Section */}
   
      <CContainer className=' text-center  '>
        <p className="display-6 fw-bold pt-4 text-light"style={{textShadow:"4px 4px 3px rgb(0,0,0)"}}>Welcome to the TiPiC's<br/> Data Management Platform</p>
        <p className="mt-3 lead" style={{color:"rgb(243, 228, 93)",textShadow:"4px 4px 3px rgb(0,0,0)"}}><b>Effortlessly view and manage all user-filled forms in one place.</b></p>
        <div >
        <img src='/img/background/tipic.webp'
        style={{height:"20vh"}}/>
        </div>
      </CContainer>
  </div>
  )
}
