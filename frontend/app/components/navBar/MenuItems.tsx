import { Button } from "primereact/button";


interface MenuItemProps{
    children: React.ReactNode;
    onClick: () => void;
}

const MenuItem:React.FC<MenuItemProps> = ({ children, onClick }) => {
    return (
        <Button className = 'h-2rem mr-4 z ' onClick={onClick}>
        {children}
        </Button>
    );
}

export default MenuItem;