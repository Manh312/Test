import { Link } from "react-router-dom";
import Button from "./Button";

interface BackButtonProps {
  to?: string;
}

const BackButton = ({ to = "/" }: BackButtonProps) => {
  return (
    <Link to={to}>
      <Button className="bg-blue-500 hover:bg-blue-600 float-left" onClick={() => {}}>Back</Button>
    </Link>
  );
};

export default BackButton;