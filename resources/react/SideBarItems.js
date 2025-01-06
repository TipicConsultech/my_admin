import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
// import { BsBack } from "react-icons/bs";
import {
  // cilBell,
  // cilCalculator,
  // cilChartPie,
  cilCursor,
  // cilDescription,
  cilNotes,
  cilChart,
  cilPuzzle,
  // cilSpeedometer,
  cilNoteAdd,
  cilGroup,
  // cilStar,
  cibElasticStack

} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { getNavData, getUserType } from './util/session';
// import PrabhuramSidebar from './views/sidebars/PrabhuramSidebar';
// import SvatolSidebar from './views/sidebars/SvatolSidebar';
// import RagasSidebar from './views/sidebars/RagasSidebar';
// import NileshSidebar from './views/sidebars/NileshSidebar';
// import TipicSidebar from './views/sidebars/TipicSidebar';
import { getAPICall } from './util/api';
import sidebarsItems from './views/sidebars/SetSideBar';



export default function fetchNavItems(){


  const user = getUserType();
  const companyId = user.company_id;
//  const sidebarsItems = getNavData();
//  console.log(sidebarsItems);

   let _nav =[];

    _nav = sidebarsItems;
    document.title=sidebarsItems[0].company_name;
    const link = document.querySelector("link[rel='shortcut icon']");
    if (link) {   //if condition is to handle error and keep project running in case of favicon not found
      link.href = sidebarsItems[0].logo; // Set the favicon dynamically
    } 

  return  _nav;
  }


