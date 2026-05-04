import { useState } from "react";
import SideBar, { SidebarItem }  from "../components/SideBar";
import {
    LayoutDashboard,
    Layers2,
    ShoppingCart,
    LogOut
} from 'lucide-react'
import CustomerScreen from "./screens/CustomerScreen";
import User from "./screens/User";
import CustomerPoint from "./screens/CustomerPoint";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate()
    const [activeView, setActiveView] = useState('Customer')

    const onLogout = () => {
        localStorage.removeItem('jsonwebtoken')
        navigate('/login')
    }

    const onClickItem = (value) => {
        console.log(`${value} Clicked`)
        setActiveView(value)
    }

    return(
        <div className="flex h-screen">
            <SideBar>
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Customer" onClick={() => onClickItem('Customer')} active={activeView === 'Customer'}/>
                <SidebarItem icon={<ShoppingCart size={20} />} text="Point" onClick={() => onClickItem('CustomerPoint')} active={activeView === 'CustomerPoint'}/>
                <SidebarItem icon={<Layers2 size={20} />} text="User" onClick={() => onClickItem('User')} active={activeView === 'User'}/>
                <SidebarItem icon={<LogOut size={20} />} text="Logout" onClick={() => onLogout()}/>
            </SideBar>

            <main className="flex-1 p-0 overflow-auto">
                {/* Your main content goes here */}
                {activeView === 'Customer' && <CustomerScreen/>}
                {activeView === 'CustomerPoint' && <CustomerPoint/>}
                {activeView === 'User' && <User/>}
            </main>
        </div>
    )
}

