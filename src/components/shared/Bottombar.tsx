import { bottombarLinks } from "@/constants";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const location = useLocation();
  const { pathName } = location;
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathName === link.route;
        return (
          <li
            key={link.label}
            className={`leftsidebar-link p-2 px-5 group flex-center flex-col ${
              isActive && "bg-primary-500"
            }`}
          >
            <Link to={link.route} className="flex items-center gap-1">
              <img
                src={link.imgURL}
                alt={link.label}
                className={`group-hover:invert-white ${
                  isActive && "invert-white"
                }`}
              />
            </Link>
            <p className="pt-2">{link.label}</p>
          </li>
        );
      })}
    </section>
  );
};

export default Bottombar;
