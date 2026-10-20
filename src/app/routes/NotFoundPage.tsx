import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>Not Found Page</h1>
      <Link to={"/"}>
        <p>Go Back</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
