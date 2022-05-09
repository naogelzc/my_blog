import { useState, useEffect } from "react";
import { Collapse, Checkbox, Row, Col } from "antd";
import { useFormatMessage } from "react-intl-hooks";
import "./index.scss";

import { getTag } from "@/api/blog";

const { Panel } = Collapse;

function Tag(props) {
  const t = useFormatMessage();
  const [plainOptions, setPlainOptions] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(true);

  useEffect(() => {
    const getTags = async () => {
      getTag().then((res) => {
        setPlainOptions(res.data.list);
        let tags = [];
        res.data.list.map((item) => tags.push(item.tag));
        setCheckedList(tags);
      });
    };
    getTags();
  }, []);

  const onChange = (list) => {
    if (list.length === 0) {
      let tags = [];
      plainOptions.map((item) => tags.push(item.tag));
      list = tags;
    }
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    if (list.length === plainOptions.length) {
      props.updateTag([]);
    } else {
      props.updateTag(list);
    }
  };

  const onCheckAllChange = (e) => {
    if (e.target.checked) {
      let tags = [];
      plainOptions.map((item) => tags.push(item.tag));
      setCheckedList(tags);
      props.updateTag([]);
    } else {
      setCheckedList([]);
    }
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header={t({ id: "selectTags" })} key="1">
        <Row className="mgt-20">
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            {t({ id: "selectAll" })}
          </Checkbox>
        </Row>
        <Row>
          <Checkbox.Group
            style={{ width: "100%" }}
            value={checkedList}
            onChange={onChange}
          >
            <Row>
              {plainOptions.map((item, i) => {
                return (
                  <Col xs={12} sm={8} md={6} lg={4} xl={3} key={i}>
                    <Checkbox value={item.tag}>{item.tag}</Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </Row>
      </Panel>
    </Collapse>
  );
}
export default Tag;
