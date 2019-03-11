import React from 'react';
import {Link} from "react-router-dom";

export default function NavBar() {
     return (
         <footer className="page-footer font-small blue pt-4">

             <div className="container-fluid text-center text-md-left">

                 <div className="row">

                     <div className="col-md-6 mt-md-0 mt-3">

                         <h5 className="text-uppercase">Footer Content</h5>
                         <p>Here you can use rows and columns here to organize your footer content.</p>

                     </div>

                     <hr className="clearfix w-100 d-md-none pb-3" />

                         <div className="col-md-3 mb-md-0 mb-3">

                             <h5 className="text-uppercase">Links</h5>

                             <ul className="list-unstyled">
                                 <li>
                                     <Link to="#!">Link 1</Link>
                                 </li>
                                 <li>
                                     <Link to="#!">Link 2</Link>
                                 </li>
                                 <li>
                                     <Link to="#!">Link 3</Link>
                                 </li>
                                 <li>
                                     <Link to="#!">Link 4</Link>
                                 </li>
                             </ul>

                         </div>

                         <div className="col-md-3 mb-md-0 mb-3">

                             <h5 className="text-uppercase">Links</h5>

                             <ul className="list-unstyled">
                                 <li>
                                     <Link to="#!">Link 1</Link>
                                 </li>
                                 <li>
                                     <Link to="#!">Link 2</Link>
                                 </li>
                                 <li>
                                     <Link to="#!">Link 3</Link>
                                 </li>
                                 <li>
                                     <Link to="#!">Link 4</Link>
                                 </li>
                             </ul>

                         </div>
                 </div>

             </div>

             <div className="footer-copyright text-center py-3">© 2018 Copyright:
                 <Link to="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</Link>
             </div>

         </footer>
        );
}