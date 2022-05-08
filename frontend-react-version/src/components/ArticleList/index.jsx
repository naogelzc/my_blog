import { Card, Badge, Pagination } from "antd";
import { useFormatMessage } from "react-intl-hooks";
import moment from "moment";
import {
  UserOutlined,
  FieldTimeOutlined,
  EyeOutlined,
  TagOutlined,
} from "@ant-design/icons";
import "./index.scss";

function ArticleList(props) {
  const { blogList } = props;
  const t = useFormatMessage();
  return (
    <Card>
      {blogList.length === 0 ? (
        <div className="main-box" v-if="blogList.length === 0">
          {t({ id: "nothing" })}
        </div>
      ) : (
        blogList.map((item, i) => {
          return (
            <div
              className="main-box"
              style={{
                display: item.isHide !== "yes" ? "flex" : "none",
                width: "100%",
              }}
              key={i}
            >
              <div
                className="left"
                style={{
                  display: item.id !== "" ? "show" : "none",
                }}
              >
                <div className="box-left">
                  <img src={item.image} alt="" />
                </div>
                <div className="box-right">
                  <div className="box-right-title">
                    <h3>{item.title}</h3>
                    <Badge
                      count={t({ id: "top" })}
                      className="istop site-badge-count-109"
                      style={{
                        display: item.istop === "yes" ? "inline-block" : "none",
                      }}
                    ></Badge>
                  </div>
                  <div className="box-right-container">
                    <h4 style={{ fontSize: "15px", color: "#409eff" }}>
                      {t({ id: "introduce" })}
                    </h4>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></div>
                  </div>
                  <div className="box-right-info">
                    <div>
                      <UserOutlined /> {item.author}
                    </div>
                    <div>
                      {t({ id: "publishDate" })}: <FieldTimeOutlined />
                      {moment(item.createdate).format("YYYY-MM-DD HH:mm:ss")}
                    </div>
                    {item.lastdate && (
                      <div>
                        {t({ id: "update" })}: <FieldTimeOutlined />
                        {moment(item.lastdate).format("YYYY-MM-DD HH:mm:ss")}
                      </div>
                    )}
                    <div>
                      <EyeOutlined /> {item.views}
                    </div>
                    <div style={{ fontSize: "14px", color: "#409eff" }}>
                      <TagOutlined />
                      {item.tag}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      <div className="pagination">
        <Pagination
          total={85}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `${t({ id: "total" })} ${total}`}
        />
      </div>
    </Card>
  );
}
export default ArticleList;
