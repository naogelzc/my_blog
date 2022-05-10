import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./index.scss";
import ArticleList from "@/components/ArticleList";
import Tag from "@/components/Tag";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { categories as getCategories } from "@/api/blog";

const getQuery = createSelector(
  (state) => state.search,
  (search) => search
);

function Categories() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const [categoriesList, setCategoriesList] = useState([]);
  const [page, setPage] = useState({ pageNum: 1, pageSize: 10 });
  const [total, setTotal] = useState(0);
  const [tag, setTag] = useState([]);
  const query = useSelector(getQuery);

  useEffect(() => {
    const getData = () => {
      const { pageNum, pageSize } = page;
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
        setTotal(res.data.total);
      });
    };
    if (tag.length === 0) {
      return;
    } else {
      getData();
    }
  }, [page, tag, query]);

  return (
    <div className="app-wrapper">
      <Particles
        id="particles-js"
        init={particlesInit}
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
      <Tag updateTag={useCallback(() => (list) => setTag(list), [])} />
      <ArticleList
        blogList={categoriesList}
        total={total}
        updatePage={(num, size) => setPage({ pageNum: num, pageSize: size })}
      />
    </div>
  );
}
export default Categories;
