import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-xl font-bold hover:text-blue-200 transition-colors duration-300"
        >
          EV Charging
        </Link>
        <div className="space-x-6">
          <Link 
            to="/stations" 
            className="hover:text-blue-200 transition-colors duration-300 font-medium"
          >
            Stations
          </Link>
          <Link 
            to="/profile" 
            className="hover:text-blue-200 transition-colors duration-300 font-medium"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
