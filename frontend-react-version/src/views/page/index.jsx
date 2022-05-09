import { useRef, useEffect, useState } from "react";
import { useFormatMessage } from "react-intl-hooks";
import { useNavigate } from "react-router-dom";
import { Button, Tag, Drawer, Space, Form, Input, message } from "antd";
import "./index.scss";
import useKeyPress from "./useKeyPress";
import avatar from "@/assets/images/blog_log.png";
import {
  getComment,
  getCommentReply,
  postComment,
  postCommentReply,
} from "@/api/blog";

const { TextArea } = Input;

function Page() {
  const t = useFormatMessage();
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState([]);
  const [childrenComment, setChildrenComment] = useState([]);
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState("");
  const [objUsername, setObjUsername] = useState("");
  let osName = useRef("");
  let osVersion = useRef("");
  const image = window.sessionStorage.getItem("image");
  const title = window.sessionStorage.getItem("title");
  const description = window.sessionStorage.getItem("description");
  const container = window.sessionStorage.getItem("container");
  const blog_container_id = window.sessionStorage.getItem("blog_id");
  const author = window.sessionStorage.getItem("author");
  const [form] = Form.useForm();
  const ctlListener = useKeyPress("Control");
  const enterListener = useKeyPress("Enter");

  useEffect(() => {
    if (ctlListener && enterListener) {
      form.submit();
    }
  }, [ctlListener, enterListener, form]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getSysIfo();
    getComment({ blog_container_id: blog_container_id }).then((res) => {
      setCommentList(res.data.list);
    });
  }, [blog_container_id]);

  useEffect(() => {
    if (commentList.length !== 0) {
      getCommentReply({ blog_container_id: blog_container_id }).then((res) => {
        setChildrenComment(res.data.list);
      });
    }
  }, [commentList, blog_container_id]);

  const getSysIfo = () => {
    const agent = navigator.userAgent;
    const left = agent.indexOf("(");
    const right = agent.indexOf(")");
    const str = agent.substring(left + 1, right);
    const Str = str.split(";");
    osName.current = Str[0].replace("NT", "");
    osVersion.current = Str[1];
  };
  const onPopup = (isComment, target = "", username = "") => {
    if (isComment) {
      setObj("");
      setObjUsername("");
    } else {
      setObj(target);
      setObjUsername(`Reply ${username}:`);
    }
    setVisible(true);
  };
  const onClose = () => {
    form.resetFields();
    setObj("");
    setVisible(false);
  };
  const onFinish = (values) => {
    const params = {
      blog_container_id: blog_container_id,
      osName: osName.current,
      topic_title: title,
      username: values.nickname,
    };
    if (osVersion.current.length > 10) {
      params.osVersion = osName.current;
    }
    if (objUsername) {
      params.comment = objUsername + values.comment;
      params.comment_id = obj.id;
      onClose();
      postCommentReply(params).then((res) => {
        if (typeof res !== "undefined" && res.code === 200) {
          message.success(res.msg);
          getCommentReply({ blog_container_id: blog_container_id }).then(
            (result) => {
              setChildrenComment(result.data.list);
            }
          );
        } else {
          message.error("fail");
        }
      });
    } else {
      params.comment = values.comment;
      params.comment_id = 0;
      onClose();
      postComment(params).then((res) => {
        if (typeof res !== "undefined" && res.code === 200) {
          message.success(res.msg);
          getComment({ blog_container_id: blog_container_id }).then(
            (result) => {
              setCommentList(result.data.list);
            }
          );
        } else {
          message.error("fail");
        }
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleKeyDown = (e) => {
    console.log(e);
  };
  return (
    <div className="app-wrapper">
      <img className="image" src={image} alt="" />
      <div className="main_box">
        <div className="main_container">
          <div className="description">
            <h4 style={{ fontSize: "15px", color: "#409eff" }}>
              {t({ id: "introduce" })}
            </h4>
            <span dangerouslySetInnerHTML={{ __html: description }}></span>
          </div>
          <div className="blog-title">
            <h3>{t({ id: "title" })}:&nbsp;</h3>
            <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
          </div>
          <div>
            <div
              className="blog-container ql-editor"
              dangerouslySetInnerHTML={{ __html: container }}
            ></div>
          </div>
          <div className="addBtns">
            <Button
              type="primary"
              onClick={() => {
                navigate(-1);
              }}
            >
              {t({ id: "back" })}
            </Button>
            <Button type="primary" onClick={() => onPopup(true)}>
              {t({ id: "comment" })}
            </Button>
          </div>
          {commentList.map((item, i) => {
            return (
              <div key={i}>
                <div className="show-comment">
                  <div className="header-ifo">
                    <div className="header-img">
                      <img src={avatar} alt="" />
                    </div>
                    <div className="header-top">
                      <div>
                        <span>{item.username}</span>
                        {item.username === author && (
                          <Tag color="#108ee9">{t({ id: "author" })}</Tag>
                        )}
                        &nbsp;
                        {item.osName !== "" && <Tag>{item.osName}</Tag>}
                        &nbsp;
                        {item.osVersion !== "" && <Tag>{item.osVersion}</Tag>}
                      </div>
                      <div className="header-footer">
                        <span style={{ fontSize: "13px" }}>
                          {item.createdate}
                        </span>
                        <Tag
                          className="cursor"
                          color="#108ee9"
                          onClick={() => {
                            onPopup(false, item, item.username);
                          }}
                        >
                          {t({ id: "reply" })}
                        </Tag>
                      </div>
                    </div>
                  </div>
                  <div
                    className="show-container"
                    dangerouslySetInnerHTML={{ __html: item.comment }}
                  ></div>
                </div>
                <div
                  style={{
                    display: childrenComment.length > 0 ? "block" : "none",
                  }}
                >
                  {childrenComment.map((children, i2) => {
                    return (
                      <div
                        className="show-comment"
                        style={{ marginLeft: "55px" }}
                        key={i2}
                      >
                        {children.comment_id === item.id && (
                          <div>
                            <div className="header-ifo">
                              <div className="header-img">
                                <img src={avatar} alt="" />
                              </div>
                              <div className="header-top">
                                <div>
                                  <span>{item.username}</span>
                                  {children.username === author && (
                                    <Tag color="#108ee9">
                                      {t({ id: "author" })}
                                    </Tag>
                                  )}
                                  &nbsp;
                                  {children.osName !== "" && (
                                    <Tag>{children.osName}</Tag>
                                  )}
                                  &nbsp;
                                  {children.osVersion !== "" && (
                                    <Tag>{children.osVersion}</Tag>
                                  )}
                                </div>
                                <div className="header-footer">
                                  <span style={{ fontSize: "13px" }}>
                                    {children.createdate}
                                  </span>
                                  <Tag
                                    className="cursor"
                                    color="#108ee9"
                                    onClick={() =>
                                      onPopup(false, item, children.username)
                                    }
                                  >
                                    {t({ id: "reply" })}
                                  </Tag>
                                </div>
                              </div>
                            </div>
                            <div
                              className="show-container"
                              dangerouslySetInnerHTML={{
                                __html: children.comment,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Drawer
        title={t({ id: "commentTitle" })}
        placement="bottom"
        closable={false}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>x</Button>
          </Space>
        }
      >
        <Form
          form={form}
          name="control-ref"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="nickname"
            rules={[{ required: true, message: "Please input your nickname!" }]}
          >
            <Input
              style={{ width: "100%" }}
              placeholder={t({ id: "nickname" })}
            />
          </Form.Item>
          <Form.Item
            name="comment"
            rules={[{ required: true, message: "Please input comment!" }]}
          >
            <TextArea
              style={{ width: "100%" }}
              autoSize={{ minRows: 4 }}
              placeholder={
                objUsername === "" ? t({ id: "writeComments" }) : objUsername
              }
            />
          </Form.Item>
          <Form.Item>
            <div className="custome">
              <Tag color="success" className="ismobile">
                {t({ id: "keyboardSubmit" })}
              </Tag>
              <Button
                type="primary"
                htmlType="submit"
                onKeyDown={(e) => handleKeyDown(e)}
              >
                {objUsername === "" ? t({ id: "publish" }) : t({ id: "reply" })}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default Page;
