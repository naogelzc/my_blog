import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Carousel } from "antd";
import "./index.scss";
import image1 from "@/assets/images/spring.jpg";
import image2 from "@/assets/images/summer.jpg";
import image3 from "@/assets/images/autumn.jpg";
import image4 from "@/assets/images/winter.jpg";
import AboutMe from "@/components/AboutMe";
function About() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  const imageBox = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
    { id: 4, image: image4 },
  ];
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
      <Carousel autoplay>
        {imageBox.map((item) => {
          return (
            <div className="web-bg" key={item.id}>
              <img src={item.image} alt="" />
            </div>
          );
        })}
      </Carousel>
      <AboutMe />
    </div>
  );
}
export default About;
