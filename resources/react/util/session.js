/**
 * Stores user data in sessionStorage.
 *
 * @param {object} userData - The user data to store.
 */
export function storeUserData(userData) {
  sessionStorage.setItem('userData', JSON.stringify(userData))
  console.log(userData);
}


export function storeNavData(navData) {
  sessionStorage.setItem('navData', JSON.stringify(navData));
}



export  function  getNavData() {
  const navData = JSON.parse(sessionStorage.getItem('navData'))
  return navData.data ;
}
/**
 * Deletes user data from sessionStorage.
 */
export function deleteUserData() {
  sessionStorage.removeItem('userData');
  sessionStorage.removeItem('navData')
}

export function isLogIn() {
  return !!sessionStorage.getItem('userData')
}


export function getToken() {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  return userData ? userData.token : null
}
    // THE FOLLOWING IS ORIGINAL CODE WRITTEN BY PRASHANT SIR
// export function getUserType() {
//   const userData = JSON.parse(sessionStorage.getItem('userData'))
//   return userData ? userData.user.type : null
// }

//THE FOLLOWING IS CODE WRITTEN BY KUNAL 
//code is change to use it in _nav.js file
export function getUserType() {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  return userData ? userData.user : null
}
