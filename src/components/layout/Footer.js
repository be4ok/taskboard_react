import React from 'react';
import {Link} from "react-router-dom";
import {MDBCol, MDBContainer, MDBFooter, MDBRow} from "mdbreact";

export default function NavBar() {
     return (
         <MDBFooter color="blue" className="font-small pt-4 mt-4">
             <MDBContainer fluid className="text-center text-md-left">
                 <MDBRow>
                     <MDBCol md="10">
                         <h5 className="title">Task Board Tool</h5>
                         <p>
                             The best personal management tool.
                         </p>
                     </MDBCol>
                     <MDBCol md="2">
                         <h5 className="title">Links</h5>
                         <ul>
                             <li className="list-unstyled">
                                 <Link to="#!">Link 1</Link>
                             </li>
                             <li className="list-unstyled">
                                 <Link to="#!">Link 2</Link>
                             </li>
                             <li className="list-unstyled">
                                 <Link to="#!">Link 3</Link>
                             </li>
                             <li className="list-unstyled">
                                 <Link to="#!">Link 4</Link>
                             </li>
                         </ul>
                     </MDBCol>
                 </MDBRow>
             </MDBContainer>
             <div className="footer-copyright text-center py-3">
                 <MDBContainer fluid>
                     &copy; {new Date().getFullYear()} Copyright: TaskBoard
                 </MDBContainer>
             </div>
         </MDBFooter>
        );
}