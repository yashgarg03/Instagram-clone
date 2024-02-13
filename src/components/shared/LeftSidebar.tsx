import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const LeftSidebar = () => {
  const { pathName }: any = useLocation();
  const { user }: any = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess]);

  return (
    <nav className="leftSideBar">
      <div className="flex flex-col gap-11 p-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
          <img
            src={user.imageUrl || "/assets/images/default-profile.jpg"}
            alt="profile"
            className="h-14 w-14 flex rounded-full"
          />
          <div className="flex-col flex">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathName === link.route;
            console.log(pathName);
            return (
              <li key={link.label} className={`leftsidebar-link ${
                isActive && "bg-primary-500"
              }`}>
                <NavLink
                  to={link.route}
                  className="flex items-center gap-4 p-4"
                >
                  <img src={link.imgURL} alt={link.label} className=""/>
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default LeftSidebar;
