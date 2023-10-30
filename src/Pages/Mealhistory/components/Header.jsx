import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <section className=" simpleHeader row mealHistoryHeader ">
      <Link to="/">
        <img
          src="https://ik.imagekit.io/kzmqi6dbk/logo.png?updatedAt=1689686339281"
          alt="logo"
        />
      </Link>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        <i>
          <RxCross2 />
        </i>
      </button>
    </section>
  );
};

export default Header;
