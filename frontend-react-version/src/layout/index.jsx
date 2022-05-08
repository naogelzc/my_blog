import React, { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import router from "@/router";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { ConfigProvider } from "antd";
import "./index.scss";

import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";

import { IntlProvider } from "react-intl-hooks";
import locale_en from "@/common/lang/en.js";
import locale_zh from "@/common/lang/zh.js";

import { Layout, Tooltip, Button } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";

import Auth from "@/components/Auth";
import NProgress from "@/components/NProgress";
import Head from "@/components/Header";
import TooltipContent from "@/components/TooltipContent";

const lang = {
  zhCN: locale_zh,
  enUS: locale_en,
};

const getLang = createSelector(
  (state) => state.lang,
  (lang) => lang
);

const { Header, Footer, Content } = Layout;

function Framework() {
  const language = useSelector(getLang);
  const locale = navigator.language.split(/[-_]/)[0];
  return (
    <IntlProvider locale={locale} messages={lang[language]} defaultLocale="en">
      <ConfigProvider locale={language === "enUS" ? enUS : zhCN}>
        <div id="scroll_top">
          <Tooltip placement="top" title={<TooltipContent />}>
            <Button
              type="primary"
              shape="circle"
              icon={<UpCircleOutlined />}
            ></Button>
          </Tooltip>
        </div>
        <HashRouter>
          <Layout className="app-wrapper">
            <Header>
              <Head />
            </Header>
            <Content>
              <Routes>
                {router.map((item, i) => {
                  return (
                    <Route
                      key={i}
                      path={item.path}
                      element={
                        <Suspense fallback={<NProgress />}>
                          <Auth>
                            <item.element />
                          </Auth>
                        </Suspense>
                      }
                    />
                  );
                })}
              </Routes>
            </Content>
            <Footer>
              <span>Copyright © 2022 Naoge</span>
            </Footer>
          </Layout>
        </HashRouter>
      </ConfigProvider>
    </IntlProvider>
  );
}

export default Framework;
