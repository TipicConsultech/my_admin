
import { getNavData } from '../../util/session';

//Here we fetch the filter data based on company(from session file) and 
// then export it to _nav to display set sidebar item 

const sidebarsItems = getNavData();
console.log(sidebarsItems);

export default sidebarsItems;