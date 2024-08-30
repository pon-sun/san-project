// import { BrowserRouter as Router, Navigate, Route, Routes, } from "react-router-dom";
// import { Suspense } from "react";
// import Dashboard from "../pages/dashboard-page/dashboard";
// import Header from "../layouts/header/header";
// import Country from "../pages/Master/Country/Country";
// import State from "../pages/Master/State/State";
// import Adminuserrights from "../pages/Adminuserrights/Adminuserrights";
// import AdminUser from "../pages/Master/Adminuser/adminuser";
// import AddEmp from "../pages/Master/Adminuser/addemp";
// import Viewnew from "../pages/View/Viewnew";
// import Insert from "../pages/View/Insert";
// import ChangePassword from "../pages/change-password/changepassword";
// import Details from "../pages/Insert/Details";
// import Aliase from "../pages/Insert/Aliase";
// import Login from "../pages/Login/login";

// const AppRouter = () => {
//     const isAuthenticated = () => {
//         const loginDetails = sessionStorage.getItem('loginDetails') || localStorage.getItem('loginDetails');
//         return loginDetails !== null;
//     };
//     return (
//         <Suspense fallback={<span>Loading....</span>}>
//             <Router>
//                 <Routes>
//                 <Route path="/" element={isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/Login" />} />
//                     <Route path="/" element={<Login />}/>
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/header" element={<Header />} />
//                     <Route path="/Country" element={<Country />} />
//                     <Route path="/State" element={<State />} />
//                     <Route path="/adminuser" element={<AdminUser />} />
//                     <Route path="/addemp" element={<AddEmp />} />
//                     <Route path="/Adminuserrights" element={<Adminuserrights />} />
//                     <Route path="/ChangePassword" element={<ChangePassword />} />
//                     <Route path="/Viewnew" element={<Viewnew />} />
//                     <Route path="/Insert" element={<Insert />} />
//                     <Route path="/Details" element={<Details />} />
//                     <Route path="/Aliase/:id" element={<Aliase />} />
//                 </Routes>
//             </Router>
//         </Suspense>
//     );
// };

// export default AppRouter;
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Dashboard from "../pages/dashboard-page/dashboard";
import Header from "../layouts/header/header";
import Country from "../pages/Master/Country/Country";
import State from "../pages/Master/State/State";
import Adminuserrights from "../pages/Adminuserrights/Adminuserrights";
import AdminUser from "../pages/Master/Adminuser/adminuser";
import AddEmp from "../pages/Master/Adminuser/addemp";
import Viewnew from "../pages/View/Viewnew";
import Insert from "../pages/View/Insert";
import ChangePassword from "../pages/change-password/changepassword";
import Details from "../pages/Insert/Details";
import Aliase from "../pages/Insert/Aliase";
import Login from "../pages/Login/login";
import Uitesting from "../pages/Insert/Uitesting";
// import Search from "../pages/Insert/Search";
import ManagerSearch from "../pages/pep/ManagerSearch";
import ViewDesign from "../pages/pep/ViewDesign";
import Entityview from "../pages/CmsView/Entityview";
import Individualview from "../pages/CmsView/Individualview";
import Aircraftview from "../pages/CmsView/Aircraftview";
import CustomerEdit from "../pages/Reports/CustomerEdit";
import Shipview from "../pages/CmsView/Shipview";
import PepSearch from "../pages/pep/PepSearch";
import Amldashboard from "../pages/aml/Amldashboard";
import Amldetails from "../pages/aml/Insert/Amldetails";
import AmlBranch from "../pages/aml/Insert/AmlBranch";
import BranchAml from "../pages/aml/Insert/BranchAml";
import Amldecision from "../pages/aml/Insert/Amldecision";
import Amledit from "../pages/aml/Edit/Amledit";
import Amlteamview from "../pages/aml/View/Amlteamview";
import CustomerEdited from "../pages/aml/Insert/CustomerEdited";
import SearchCms from "../pages/CmsView/SearchCms";
import Customerview from "../pages/aml/Insert/Customerview";
import Amlbranchedit from "../pages/aml/Edit/Amlbranchedit";
import Alert from "../pages/BtmsView/Insert/Alert";
import AlertDetails from "../pages/BtmsView/Insert/AlertDetails";
import AlertGeneral from "../pages/BtmsView/Insert/AlertGeneral";
import AlertGeneralview from "../pages/BtmsView/Viewpage/AlertGeneralview ";
import Alertview from "../pages/BtmsView/Viewpage/Alertview";
import AlertDetailsview from "../pages/BtmsView/Viewpage/AlertDetailsview";
import Fraud from "../pages/aml/fraud/insert/Fraud";
import Result from "../pages/googelsearch/Result";
import ReportSearch from "../pages/pep/ReportSearch";
import CounterfeitDetails from "../pages/aml/counterfeit/CounterfeitDetails";
import AmlScam from "../pages/aml/Insert/AmlScam";
import ReportSearchcms from "../pages/CmsView/ReportSearchcms";
import Branchusermapping from "../pages/aml/Insert/Branchusermapping";
import CounterfeitView from "../pages/aml/counterfeit/CounterfeitView";
import CounterfeitCustomerEdit from "../pages/aml/counterfeit/CounterfeitCustomerEdit";
import Fraudcustomeredit from "../pages/aml/fraud/view/Fraudcustomeredit";
import CustomerEditdecision from "../pages/aml/Insert/CustomerEditdecision";
import ScamSearch from "../pages/aml/Insert/ScamSearch";
import ScamEdit from "../pages/aml/Edit/ScamEdit";
import ScamView from "../pages/aml/View/ScamView";
import FraudView from "../pages/aml/View/FraudView";
import Amlbranchview from "../pages/aml/View/Amlbranchview";
import FraudEdit from "../pages/aml/fraud/insert/FraudEdit";
import Amltemasdashboard from "../pages/aml/Amltemasdashboard";
import Aml from "../pages/aml/Insert/Aml";
import SanctionSearch from "../pages/Insert/ReportSearch";
import CounterfeitEdit from "../pages/aml/counterfeit/CounterfeitEdit";
import Applicationfrome from "../pages/kyc/Insert/Applicationfrome";
import SanLevel1FirstReview from "../pages/san_search/SanLevel1FirstReview";
import SanLevel2Search from "../pages/san_search/Sanlevel 2 search/SanLevel2Search";
import SanLevel3Search from "../pages/san_search/Sanlevel 3 search/SanLevel3Search";
import SanLevel1secReview from "../pages/san_search/Sanlevel 1 search/SanLevel1secReview";
import PepLevel1FirstReview from "../pages/pep_search/PepLevel1FirstReview";
import PepLevel1secReview from "../pages/pep_search/Peplevel 1 search/PepLevel1secReview";
import PepLevel2Search from "../pages/pep_search/Peplevel 2 search/PepLevel2Search";
import PepLevel3Search from "../pages/pep_search/Peplevel 3 search/PepLevel3Search";
import CmsLevel1FirstReview from "../pages/cms_search/CmsLevel1FirstReview";
import CmsLevel1secReview from "../pages/cms_search/Cmslevel 1 search/CmsLevel1secReview";
import CmsLevel2Search from "../pages/cms_search/Cmslevel 2 search/CmsLevel2Search";
import CmsLevel3Search from "../pages/cms_search/Cmslevel 3 search/CmsLevel3Search";

import Notification from '../pages/san_search/Notification/Notification'
import Search from "../pages/san_search/Search";

const AppRouter = () => {
    const isAuthenticated = () => {
        const loginDetails = sessionStorage.getItem('loginDetails') || localStorage.getItem('loginDetails');
        return loginDetails !== null;
    };
    return (
        <Suspense fallback={<span>Loading....</span>}>
            <Router>
                <Routes>
                    {/* Protected Route */}
                    <Route
                        path="/"
                        element={
                            isAuthenticated() ? (
                                <Outlet /> // Renders the child routes if authenticated
                            ) : (
                                <Navigate to="/login" /> // Redirects to login if not authenticated
                            )
                        }
                    />
                    {/* Unprotected Route */}
                    <Route path="/login" element={<Login />} />
                    {/* Nested routes */}
                    <Route path="/" element={<Outlet />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/header" element={<Header />} />
                        <Route path="/Country" element={<Country />} />
                        <Route path="/State" element={<State />} />
                        <Route path="/adminuser" element={<AdminUser />} />
                        <Route path="/addemp" element={<AddEmp />} />
                        <Route path="/Adminuserrights" element={<Adminuserrights />} />
                        <Route path="/ChangePassword" element={<ChangePassword />} />
                        <Route path="/Viewnew" element={<Viewnew />} />
                        <Route path="/Insert" element={<Insert />} />
                        <Route path="/Details" element={<Details />} />
                        <Route path="/Aliase/:id" element={<Aliase />} />
                        <Route path="/Uitesting" element={<Uitesting />} />
                        <Route path="/Search" element={<Search />} />
                        <Route path="/ManagerView" element={<ManagerSearch />} />
                        <Route path="/viewDesign/:pepId/:uid" element={<ViewDesign />} />
                        <Route path="/QcView" element={<CustomerEdit />} />
                        <Route path="/QcView/:cmsId" element={<CustomerEdit />} />
                        <Route path="/view/Entityview/:cmsId/:uid/:recordTypeId" element={<Entityview />} />
                        <Route path="view/Individualview/:cmsId/:uid/:recordTypeId" element={<Individualview />} />
                        <Route path="view/Aircraftview/:cmsId/:uid/:recordTypeId" element={<Aircraftview />} />
                        <Route path="view/Shipview/:cmsId/:uid/:recordTypeId" element={<Shipview />} />
                        <Route path="SearchCms" element={<SearchCms />} />
                        <Route path="PepSearch" element={<PepSearch />} />
                        <Route path="Amldashboard" element={<Amldashboard />} />
                        <Route path="Amltemasdashboard" element={<Amltemasdashboard />} />
                        <Route path="Aml" element={<Aml />} />
                        <Route path="/Amldetails" element={<Amldetails />} />
                    {/* <Route path="/AmlBranch/:ticketId/:complaintId/:uid" element={<AmlBranch />} /> */}
                    <Route path="/AmlBranch/:complaintId/:uid" element={<AmlBranch />} />
                    <Route path="/BranchAml/:complaintId/:uid" element={<BranchAml />} />
                    <Route path="/Amldecision/:complaintId/:uid" element={<Amldecision />} />
                    <Route path="/QcViewed" element={<CustomerEdited />} />
                    <Route path="/QcViewed/:complaintId" element={<CustomerEdited />} />
                    <Route path="/QcViewdecision" element={<CustomerEditdecision />} />
                    <Route path="/QcViewdecision/:complaintId" element={<CustomerEditdecision />} />
                    <Route path="/Amlbranchview/:complaintId/:uid" element={<Amlbranchview />} />

                    <Route path="/Amledit/:complaintId/:uid" element={<Amledit />} />
                    <Route path="/Amlbranchedit/:complaintId/:uid" element={<Amlbranchedit />} />
                    {/* <Route path="/Branchusermapping" element={<Branchusermapping />} /> */}
                    <Route path="/Amlteamview/:complaintId/:uid" element={<Amlteamview />} />
                    <Route path="/QcViewaml" element={<Customerview />} />
                    <Route path="/QcViewaml/:complaintId " element={<Customerview />} />
                    
                    <Route path="/QcViewfraud" element={<Fraudcustomeredit />} />
                    <Route path="/QcViewfraud/:fraudId" element={<Fraudcustomeredit />} />
                    <Route path="/FraudEdit/:fraudId/:uid" element={<FraudEdit />} />


                    <Route path="/Details/:customerId" element={<Details />} />
                    <Route path="/Insert" element={<Insert />} />
                    <Route path="/Alert" element={<Alert />} />
                    
                    <Route path="/AlertDetails/:customerId/:id" element={<AlertDetails />} />
                    <Route path="/AlertDetails" element={<AlertDetails />} />
                    <Route path="/AlertGeneral/:customerId/:id" element={<AlertGeneral />} />
                    <Route path="/AlertGeneral" element={<AlertGeneral />} />
                    <Route path="/AlertGeneralview/:customerId/:id" element={<AlertGeneralview />} />
                    <Route path="/Alertview" element={<Alertview />} />
                    <Route path="/AlertDetailsview/:customerId/:id" element={<AlertDetailsview />} />
                    <Route path="/AmlScam" element={<AmlScam />} />
               
                    <Route path="/Fraud" element={<Fraud />} />
                    <Route path="/Result" element={<Result />} />
                    <Route path="/ReportSearch" element={<ReportSearch />} />
                    <Route path="/CounterfeitDetails" element={<CounterfeitDetails />} />
                    <Route path="/ScamView/:scamId/:uid" element={<ScamView />} />
                    <Route path="/ScamSearch" element={<ScamSearch />} />
                        <Route path="/ScamEdit" element={<ScamEdit />} />
                        <Route path="/ScamEdit/:scamId/:uid" element={<ScamEdit />} />
                    <Route path="/ReportSearchcms" element={<ReportSearchcms />} />
                    <Route path="/Branchusermapping" element={<Branchusermapping />} />
                    <Route path="/CounterfeitView/:counterfeitId/:uid" element={<CounterfeitView />} />
                    <Route path="/CounterfeitCustomerEdit" element={<CounterfeitCustomerEdit />} />
                    <Route path="/FraudView/:fraudId/:uid" element={<FraudView />} />
                        <Route path="/FraudView" element={<FraudView />} />
                        <Route path="/SanctionSearch" element={<SanctionSearch />} />
                        <Route path="/CounterfeitEdit/:counterfeitId/:uid" element={<CounterfeitEdit />} />
                        
                        <Route path="/Applicationfrome" element={<Applicationfrome />} />
                        <Route path="/SanLevel1FirstReview" element={<SanLevel1FirstReview />} />
                            <Route path="/SanLevel1secReview" element={<SanLevel1secReview />} />
                            <Route path="/SanLevel2Search" element={<SanLevel2Search />} />
                            <Route path="/SanLevel3Search" element={<SanLevel3Search />} />
                             <Route path="/Search" element={<Search />} />
                            <Route path="/PepLevel1FirstReview" element={<PepLevel1FirstReview />} />
                            <Route path="/PepLevel1secReview" element={<PepLevel1secReview />} />
                            <Route path="/PepLevel2Search" element={<PepLevel2Search />} />
                            <Route path="/PepLevel3Search" element={<PepLevel3Search />} />
                            <Route path="/CmsLevel1FirstReview" element={<CmsLevel1FirstReview />} />
                            <Route path="/CmsLevel1secReview" element={<CmsLevel1secReview />} />
                            <Route path="/CmsLevel2Search" element={<CmsLevel2Search />} />
                            <Route path="/CmsLevel3Search" element={<CmsLevel3Search />} />
                            <Route path="/Notification" element={<Notification />} />


                        
                    </Route>
                </Routes>
            </Router>
        </Suspense>
    );
};

export default AppRouter;
