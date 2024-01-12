import { Outlet } from "react-router-dom"
import { Navbar } from "../../components"

const MainLayout = () => {

    return (
        <div>
            <div>
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout