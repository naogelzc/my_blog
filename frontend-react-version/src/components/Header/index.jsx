import { Menu, Input } from "antd";
import { useFormatMessage } from "react-intl-hooks";
import { useNavigate, useLocation } from "react-router-dom";
import blogImage from "@/assets/images/blog_header.png";
import "./index.scss";
function Header() {
  const t = useFormatMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    { label: t({ id: "home" }), key: "" },
    { label: t({ id: "category" }), key: "categories" },
    { label: t({ id: "about" }), key: "about" },
  ];
  const handleClick = (e) => {
    const path = "/" + e.key;
    navigate(path, { replace: true });
  };
  return (
    <>
      <div className="isShow">
        <img src={blogImage} alt="" />
        <span style={{ color: "#409eff" }}>Naoge Blog</span>
      </div>
      <div>
        {location.pathname === "/categories" && <Input placeholder="Search" />}
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
