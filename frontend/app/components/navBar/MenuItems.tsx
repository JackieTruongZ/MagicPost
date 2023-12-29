import { Button } from "primereact/button";

interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div
      className="nav-bar-items flex align-items-center justify-content-center w-4rem h-4rem mr-4 lg:mr-8"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MenuItem;
