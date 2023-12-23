import { Route, Routes } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import AddUsers from "./components/AddUsers";


function Router() {
    return (
        <Routes>
            <Route path="/" element={<AddUsers />}></Route>
            <Route path="/user" element={<UserDetails />}></Route>
        </Routes>
    )
}
export default Router