import { useEffect, useState } from "react";
import { useFormatMessage } from "react-intl-hooks";
import { Tag, Row, Col, Input, Button, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import "./index.scss";

import { captcha, contact } from "@/api/blog";

const { TextArea } = Input;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const getLang = createSelector(
  (state) => state.lang,
  (lang) => lang
);

function AboutMe() {
  const t = useFormatMessage();
  const language = useSelector(getLang);
  const zhPersonal = (
    <p className="personal">
      Naoge，20年纽村计算机专业毕业，前端工程师，后端也熟悉，数据挖掘也会点，serverless学习中。
      <br />
      从初中接触到了互联网，起了个不易撞名的网名【孬哥】，跟着朋友们就叫我孬哥了。
      <br />
      喜欢研究各种技术，但也不敢说精通哪个，喜欢捣鼓各种工具，但效率也不高。
      <br />
      2022的目标: 保持健康，减肥！！！
    </p>
  );
  const enPersonal = (
    <p className="personal">
      I graduated from the University of Auckland at the end of 2019 in New
      Zealand, majoring in information technology. As a front-end engineer, I
      know both front-end and back-end technologies. I am currently learning
      serverless.
      <br />
      <br />
      I like to study different knowledge, not only information technology, but
      also economy and culture. In the leisure time, I prefer mountain climbing,
      swimming, listening to songs, especially cooking.
      <br />
      <br />
      The goal for 2022: obtain an Azure certificate and lose weight.
      <br />
    </p>
  );
  const zhBlog = (
    <p className="personal">
      闲来无事，做个博客。由于还在开发阶段，各项功能不完善，先不放源码呢。
      <br />
      技术栈如下：
    </p>
  );
  const enBlog = (
    <p className="personal" v-else>
      This blog records some technical knowledge encountered in my study and
      work. This blog is still in the development stage, and its functions are
      not perfect. After completion, I will upload the source code to GitHub. If
      anyone wants the blog source code at the moment, please contact me below.
      <br />
      <br />
      The Technology stack：
    </p>
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [detail, setDetail] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [key, setVerifyKey] = useState("");
  const [imgcode, setImgcode] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    changeCodeImg();
  }, []);
  const changeCodeImg = async () => {
    captcha().then((res) => {
      setImgcode(res.data.url.img);
      setVerifyKey(res.data.url.key);
    });
  };
  const reset = () => {
    setUsername("");
    setEmail("");
    setDetail("");
    setVerifyCode("");
    changeCodeImg();
  };
  const submit = () => {
    if (!username) {
      message.error("Please input name");
      return;
    }
    if (!email) {
      message.error("Please input email");
      return;
    }
    if (!detail) {
      message.error("Please input detail");
      return;
    }
    if (!verifyCode) {
      message.error("Please input verify code");
      return;
    }
    setLoad(true);
    const params = {
      username,
      email,
      detail,
      verifyCode,
      key,
    };
    contact(params).then((res) => {
      setLoad(false);
      reset();
      if (typeof res === "undefined" || res.code !== 200) {
        message.error(res.msg);
        return;
      }
      message.success("I will contact you asap!");
    });
  };
  return (
    <div className="about">
      <div className="introduce">
        <h1 className="title">{t({ id: "aboutMe" })}</h1>
        {language === "zhCN" ? zhPersonal : enPersonal}
      </div>
      <div className="introduce">
        <h1 className="title">{t({ id: "blogIntroduction" })}</h1>
        {language === "zhCN" ? zhBlog : enBlog}
        <Tag color="#f50">react</Tag>
        <Tag color="#2db7f5">react-redux</Tag>
        <Tag color="#87d068">axios</Tag>
        <Tag color="#108ee9">AntDesign</Tag>
        <Tag color="#134122">Laravel</Tag>
      </div>
      <Spin indicator={antIcon} size={"large"} spinning={load}>
        <div className="introduce">
          <h1 className="title">{t({ id: "contactMe" })}</h1>
          <Row gutter={20}>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Please input name"
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please input email"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <div style={{ margin: "20px 0" }} />
          <Row gutter={20}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <TextArea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Please input detail"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <div style={{ margin: "20px 0" }} />
          <Row gutter={20}>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <img onClick={changeCodeImg} src={imgcode} alt="" />
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Input
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder="Please input verify code"
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <div style={{ margin: "20px 0" }} />
          <Row gutter={20}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <div style={{ margin: "0 auto", textAlign: "center" }}>
                <Button onClick={reset} style={{ marginRight: "20px" }}>
                  {t({ id: "reset" })}
                </Button>
                <Button type="primary" onClick={submit}>
                  {t({ id: "send" })}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
}
export default AboutMe;
