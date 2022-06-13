import { NavLink } from 'react-router-dom';
import './header.css';



const Header = () => {
  return (
    <header>
      <div className="header">
        <h2>Header component</h2>
        <nav>
          <ul>
            <li><NavLink style={({isActive}) => ({color: isActive ? 'red' : 'inherit'})} to="/">Home</NavLink></li>
            <li><NavLink style={({isActive}) => ({color: isActive ? 'red' : 'inherit'})} to="/comic">Comics</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;