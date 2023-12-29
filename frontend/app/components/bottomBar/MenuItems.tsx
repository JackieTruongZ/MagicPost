import { Button } from "primereact/button";


interface MenuItemProps{
    children: React.ReactNode;
    onClick: () => void;
}

const MenuItem:React.FC<MenuItemProps> = ({ children, onClick }) => {
    return (
        <div className = 'flex align-items-center justify-content-center w-4rem h-4rem mr-5 text-xl md:text-2xl' onClick={onClick}>
        {children}
        
        </div>
    );
}

export default MenuItem;