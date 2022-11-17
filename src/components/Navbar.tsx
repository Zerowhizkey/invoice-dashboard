import { NavLink } from 'react-router-dom';
import { TfiDashboard } from 'react-icons/tfi';
import { HiOutlineUsers, HiOutlineFolder, HiCalendar } from 'react-icons/hi';
import { BiTask } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';

const Navbar = () => {
    const activeStyle = {
        color: 'orange',
        fontSize: 'x-large',
        padding: '0.5em',
    };
    const inActiveStyle = {
        color: 'black',
        fontSize: 'x-large',
        padding: '0.5em',
    };

    return (
        <div className="nav-container">
            <h3>PIRIUS</h3>
            <div>
                <li>
                    <NavLink
                        to={'/'}
                        style={({ isActive }) =>
                            isActive ? activeStyle : inActiveStyle
                        }
                    >
                        <TfiDashboard />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'users'}
                        style={({ isActive }) =>
                            isActive ? activeStyle : inActiveStyle
                        }
                    >
                        <HiOutlineUsers />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'projects'}
                        style={({ isActive }) =>
                            isActive ? activeStyle : inActiveStyle
                        }
                    >
                        <HiOutlineFolder />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'tasks'}
                        style={({ isActive }) =>
                            isActive ? activeStyle : inActiveStyle
                        }
                    >
                        <BiTask />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'timelogs'}
                        style={({ isActive }) =>
                            isActive ? activeStyle : inActiveStyle
                        }
                    >
                        <HiCalendar />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to={'/'}
                        style={({ isActive }) =>
                            isActive ? activeStyle : inActiveStyle
                        }
                    >
                        <BsGear />
                    </NavLink>
                </li>
                <p>Logout</p>
            </div>
        </div>
    );
};

export default Navbar;
