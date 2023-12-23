import { Route, Routes } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import AddContacts from "./components/AddContacts";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<AddContacts />}></Route>
            <Route path="/user" element={<UserDetails />}></Route>
        </Routes>
    )
}
export default Router