import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./index.scss";
import ArticleList from "@/components/ArticleList";
import Tag from "@/components/Tag";
import { useState, useEffect } from "react";
import { categories as getCategories } from "@/api/blog";

function Categories() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };
  const [categoriesList, setCategoriesList] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = (pageNum = 1, pageSize = 10, tag = [], query = "") => {
    const params = {
      pageNum,
      pageSize,
      query,
    };
    if (tag.length !== 0) {
      params.tag = tag.toString();
    }
    getCategories(params).then((res) => {
      setCategoriesList(res.data.list);
    });
  };
  return (
    <div className="app-wrapper">
      <Particles
        id="particles-js"
        init={particlesInit}
        // loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#ffffff",
            },
          },
          fpsLimit: 80,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "connect",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#0d47a1",
            },
            links: {
              color: "#0d47a1",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 0.5,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 4,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 2000,
              },
              value: 40,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 0, max: 2 },
            },
          },
          detectRetina: true,
        }}
      />
      <Tag />
      <ArticleList blogList={categoriesList} />
    </div>
  );
}
export default Categories;
