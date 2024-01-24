import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const BackButton = ({ destination = '/'}) => {
    return (
        <div className="flex">
            <Link to={destination}>
                <BsArrowLeft className="text-sky-800 text-4xl" />
            </Link>
        </div>
    );
}

export default BackButton;