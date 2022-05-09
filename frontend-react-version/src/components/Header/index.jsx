import { useEffect, useState } from "react";
import { Menu, Input } from "antd";
import { useFormatMessage } from "react-intl-hooks";
import { useNavigate, useLocation } from "react-router-dom";
import blogImage from "@/assets/images/blog_header.png";
import { useDispatch } from "react-redux";
import { updateSearch } from "@/store/search/actions";
import "./index.scss";
function Header() {
  const t = useFormatMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const items = [
    { label: t({ id: "home" }), key: "" },
    { label: t({ id: "category" }), key: "categories" },
    { label: t({ id: "about" }), key: "about" },
  ];
  const handleClick = (e) => {
    const path = "/" + e.key;
    navigate(path, { replace: true });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updateSearch(search));
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, dispatch]);
  return (
    <>
      <div className="isShow">
        <img src={blogImage} alt="" />
        <span style={{ color: "#409eff" }}>Naoge Blog</span>
      </div>
      <div>
        {location.pathname === "/categories" && (
          <Input
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        <Menu
          mode="horizontal"
          items={items}
          defaultOpenKeys={[location.pathname.replace("/", "")]}
          defaultSelectedKeys={[location.pathname.replace("/", "")]}
          onClick={(e) => handleClick(e)}
        />
      </div>
    </>
  );
}

export default Header;
