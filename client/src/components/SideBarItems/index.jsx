import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function SideBarItems({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="flex flex-col w-full p-3 mb-2 rounded-lg items-between "
      onClick={item.childrens ? toggle : null}
    >
      <div className="flex justify-between">
        {/* parent route */}
        <div className="flex items-center justify-evenly">
          {!!item.leftIcon && <item.leftIcon size={20} />}
          <NavLink to={item?.to || null} className="ml-2">
            {item.title}
          </NavLink>
        </div>
        {item.childrens && (
          <item.rightIcon
            size={20}
            className={` transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`} // Rotating effect
          />
        )}
      </div>
      {/* Children routes */}
      {isOpen && item.childrens ? (
        <div className="w-full h-full ml-1">
          {item.childrens.map((child, index) => (
            <div key={index} className="flex items-center p-2 tracking-wide rounded-lg">
              <child.leftIcon className="mr-2" />
              <NavLink 
              to={`${child.to}`}
              className={({isActive}) => `${(isActive ? "bg-violet-700 shadow-sm rounded-lg text-white font-semibold " : "")} w-full p-2`}
              >
                {child.title}
              </NavLink>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

SideBarItems.propTypes = {
  item: PropTypes.object.isRequired,
}

export default SideBarItems;
