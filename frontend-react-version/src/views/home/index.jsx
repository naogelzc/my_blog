import React, { useEffect, useState } from "react";
import "./index.scss";
import AboutMe from "@/components/AboutMe";
import { getImage } from "@/api/blog";
import ImageUrl from "@/assets/images/bg.jpg";
function Home() {
  const [image, setImage] = useState();
  const [str, setStr] = useState("");
  const [showCN, setShowCN] = useState(false);
  const [random] = useState(Math.floor(Math.random() * 7));
  const [mottos] = useState([
    {
      zh: "愿你保持初心和善良,笑里尽是温暖与坦荡。",
      en: "May you keep your original heart and kindness, and smile with warmth and magnanimity.",
    },
    {
      zh: "年轻就是无限的可能。",
      en: "Youth means limitless possibilities.",
    },
    {
      zh: "真正的梦就是现实的彼岸。",
      en: "Real dream is the other shore of reality.",
    },
    {
      zh: "不为模糊不清的未来担忧，只为清清楚楚的现在努力。",
      en: "Don't worry about the vague future, just strive for the clear present.",
    },
    {
      zh: "与其装腔作势企图影响别人，不如咬牙切齿狠命修理自己。",
      en: "Rather than pretending to influence others, it's better to grind your teeth and repair yourself.",
    },
    {
      zh: "上天是公平的，只要努力就会有收获，否则就是你不够努力。",
      en: "God is fair, as long as effort will include results, otherwise is you hard enough.",
    },
    {
      zh: "人生没有后悔，我们只能尽力去不让自己后悔。",
      en: "Life without regret, we can only do our best to not to regret.",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      getImage().then((res) => {
        if (typeof res === "undefined" || res.code !== 200) {
          setImage(ImageUrl);
        } else {
          setImage(res.data.url);
        }
        let strLen = 0;
        let stop = null;
        let currentStr = "";
        const strPrint = () => {
          currentStr += mottos[random].en.charAt(strLen);
          setStr(currentStr);
          strLen++;
          if (strLen === mottos[random].en.length) {
            setShowCN(true);
            clearTimeout(stop);
          }
        };
        stop = setInterval(strPrint, 60);
      });
    };
    fetchData();
  }, [mottos, random]);

  return (
    <div>
      <div className="web-bg">
        <img src={image} alt="" />
        <div className="show-info">
          <div className="show-message">
            <h1>{str}</h1>
            {showCN && <h1 className="h1-fade-in">{mottos[random].zh}</h1>}
          </div>
        </div>
      </div>
      <div className="aboutShow">
        <AboutMe />
      </div>
    </div>
  );
}

export default Home;
