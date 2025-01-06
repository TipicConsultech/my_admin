import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


import { logout } from '../../util/api'
import { deleteUserData, getUserType } from '../../util/session'
import { Link, useNavigate } from 'react-router-dom'
import { AppHeader } from '..'

// //Logos
import tipic_logo from '../../../../public/favicons/tipic.webp'
import prabhuram_logo from '../../../../public/favicons/prabhuram_logo.webp'
import svatol_logo from '../../../../public/favicons/svatol_logo.webp'
import ragas_logo from '../../../../public/favicons/Raga_logo3.webp'
import nilesh_logo from '../../../../public/favicons/nilesh_logo.webp'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    deleteUserData()
    navigate('/login')
  }

  const [companyLogo,setCompanyLogo] = useState(tipic_logo);
  useEffect( ()=>{
    const fetchUserType = async() =>{
      try{
        const user = await getUserType();
        const companyId = user.company_id;
        if(companyId == 1){
          setCompanyLogo(tipic_logo);
        }else if(companyId == 2){
        setCompanyLogo(svatol_logo);
      } else if(companyId == 3){
        setCompanyLogo(ragas_logo);
      } else if(companyId == 4){
        setCompanyLogo(nilesh_logo);
      } else if(companyId == 5){
        setCompanyLogo(prabhuram_logo);
      }}
      catch{
        setCompanyLogo(tipic_logo)
      }
    };
    fetchUserType();
  },[])

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={companyLogo} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        
        <CDropdownItem ><Link style={{ textDecoration: 'none', color: 'inherit' }} to="/updatepassword"><CIcon icon={cilSettings} className="me-2" />Password        </Link>
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          {/* <button onClick={handleLogout}> */}
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
          {/* </button> */}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
