import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { getUserType } from '../util/session'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [companyId, setCompanyId] = useState();
  useEffect(()=>{
    const fetchCompanyId = async () =>{
      try{const user = await getUserType();
        setCompanyId(user.company_id);
      }catch{
        // console.log("fail to fetch company id");
      }
    };
    fetchCompanyId();
  },[])

  const [navItems , setNavItems] = useState([]);
  // useEffect(() =>{
  //     if (!companyId) return; // Wait until companyId is fetched
  //     const navData = {
  //           1:  [
  //             { title: "Contact Us", link: "#/tipicContactUs" },
  //           ],
  //           2: [
  //             { title: "Appoinement", link: "#/svatolAppoinement" },
  //             { title: "Contact Us", link: "#/svatolContactUs" },
  //           ],
  //           3: [
  //             { title: "Orders", link: "#/ragasOrders" },
  //             { title: "Contact Us", link: "#/ragasContactUs" },
  //           ],
  //           4: [
  //               { title: "Donations", link: "#/nileshDonation" },
  //               { title: "Contact Us", link: "#/nileshContactUs" },
  //             ],
  //           5: [
  //             { title: "Admission Form", link: "#/prabhuramAdmission" },
  //             { title: "Enquiry", link: "#/prabhuramEnquiry" },
  //             { title: "Contact Us", link: "#/prabhuramContactUs" },
  //             ],
  //         };
  //       setNavItems(navData[companyId] || []); // Dynamically set navigation items
  //     }, [companyId]);       // Runs whenever companyId changes

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <div className='no-print'>
    <CHeader position="sticky" className="mb-4 p-0 " ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">

      {/* Dynamic Nav Items */}
        {navItems.map((item, index) => (
        <CNavItem key={index}>
          <CNavLink href={item.link}>{item.title}</CNavLink>
        </CNavItem>
      ))} 
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
    </div>
  )
}

export default AppHeader
