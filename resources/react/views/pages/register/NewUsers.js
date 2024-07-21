import React, { useEffect, useRef, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilMobile,cilPeople } from '@coreui/icons'
import { register } from '../../../util/api'
import { isLogIn, storeUserData } from '../../../util/session'
import { useNavigate } from 'react-router-dom'


const NewUsers = () => {
  const [errorMessage, setErrorMessage] = useState()
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()
  const nameRef = useRef()
  const emailRef = useRef()
  const mobileRef = useRef()
  const pwdRef = useRef()
  const cPwdRef = useRef()
  const [isTypeInvalid, setTypeIsInvalid] = useState(false);
  const typeRef = useRef()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    password_confirmation: '',
    type: '',
  });

  const handleSelect = () => {
    const value = parseInt(typeRef.current.value, 10);
    if ([0, 1, 2].includes(value)) {
      setTypeIsInvalid(false);
    } else {
      setTypeIsInvalid(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget

    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }

    setUserData({
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      mobile: mobileRef.current?.value,
      password: pwdRef.current?.value,
      password_confirmation: cPwdRef.current?.value,
      type: typeRef.current?.value,
    });

    const { name, email, mobile, password, password_confirmation, type } = userData;

    try {
      const resp = await register({ name, email, mobile, type, password, password_confirmation })
      storeUserData(resp)
      navigate('/usermanagement/create-user')
    } catch (error) {
      setErrorMessage(error.message ?? 'Please provide valid data')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-6">
              <CCardBody className="p-4">
                <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                  <h1>Register User </h1>
                  <p className="text-body-secondary">Create User account</p>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilPeople} />
                    </CInputGroupText>
                    <CFormSelect
                      onChange={handleSelect}
                      aria-label="Default select example"
                      ref={typeRef}
                      invalid={isTypeInvalid}
                      options={[
                        { label: 'Select User Type ', value: '' },
                        { label: 'Super Admin', value: '0' },
                        { label: 'Admin', value: '1' },
                        { label: 'User', value: '2', disabled: false }
                      ]}
                      feedbackInvalid="Please select a valid option."
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      ref={nameRef}
                      type='username'
                      placeholder="Username"
                      autoComplete="name"
                      required
                      feedbackInvalid="Please provide name."
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      ref={emailRef}
                      placeholder="Email"
                      autoComplete="email"
                      type='email'
                      required
                      feedbackInvalid="Please provide email."
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilMobile} />
                    </CInputGroupText>
                    <CFormInput
                      ref={mobileRef}
                      placeholder="Mobile"
                      autoComplete="phone"
                      type='mobile'
                      required
                      feedbackInvalid="Please provide mobile number."
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      ref={pwdRef}
                      placeholder="Enter New Password"
                      autoComplete="new-password"
                      required
                      feedbackInvalid="Please provide password."
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      ref={cPwdRef}
                      type="password"
                      placeholder="Confirm  password"
                      autoComplete="new-password"
                      required
                      feedbackInvalid="Please provide confirm password."
                    />
                  </CInputGroup>
                  
                  {errorMessage && (
                    <CRow>
                      <CAlert color="danger">{errorMessage}</CAlert>
                    </CRow>
                  )}
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default NewUsers
