import { IconContext } from "react-icons";
import menuOptions from "../../josn_files/menu_options.json";
import { MdOutlineAccountCircle } from "react-icons/md";

const MenuItem = ({ label, path }) => {
  return (
    <div className="mobile-menu-item">
      <div className="mobile-menu-item-inner">
        <div
          className="w-2 h-full mr-3
                rounded-tl-sm rounded-bl-sm
                bg-slate-400"
        ></div>
        {label}
      </div>
    </div>
  );
};

const MobileMenu = () => {
  return (
    <div className="mobile-menu-body">
      <div className="mobile-menu-top-bar">
        <div className="menu-profile-body">
          <div className="menu-profile-label">Login</div>

          <div className="menu-profile-icon">
            <IconContext.Provider value={{ color: "white" }}>
              <MdOutlineAccountCircle size={30} />
            </IconContext.Provider>
          </div>
        </div>
      </div>

      {Object.keys(menuOptions).map((key) => {
        const itemData = menuOptions[key];

        return <MenuItem key={key} label={key} path={itemData.path} />;
      })}
    </div>
  );
};

export default MobileMenu;
