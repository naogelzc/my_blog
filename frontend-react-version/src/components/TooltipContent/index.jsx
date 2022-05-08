import { useSelector, useDispatch } from "react-redux";
import { Switch, Button } from "antd";
import { useFormatMessage } from "react-intl-hooks";
import { createSelector } from "reselect";
import { updateLang } from "@/store/lang/actions";
import "./index.scss";

const getLang = createSelector(
  (state) => state.lang,
  (lang) => lang
);

export default function TooltipContent() {
  const dispatch = useDispatch();
  const t = useFormatMessage();
  const language = useSelector(getLang);
  return (
    <>
      <Switch
        checkedChildren="English"
        unCheckedChildren="中文"
        defaultChecked={language === "enUS"}
        onClick={() => dispatch(updateLang())}
      />
      <br />
      <br />
      <Button
        type="primary"
        shape="round"
        size="small"
        onClick={() => window.scrollTo(0, 0)}
      >
        {t({ id: "backToTop" })}
      </Button>
    </>
  );
}
