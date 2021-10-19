import { useState } from "react";
import "./Slider.css";
import dataSlider from "./dataSlider";
import BtnSlider from "./BtnSlider";

export default function Slider() {
  // useState sera un objet car besoin de 2 propriétés
  const [slideAnim, setSlideAnim] = useState({
    index: 1,
    inProgress: false,
  });
  const nextSlide = () => {
    // Si l'index est strictement différent de la longeur du tableau de dataSlider
    if (slideAnim.index !== dataSlider.length && !slideAnim.inProgress) {
      setSlideAnim({ index: slideAnim.index + 1, inProgress: true });
      setTimeout(() => {
        setSlideAnim({ index: slideAnim.index + 1, inProgress: false });
      }, 500);
    } else if (slideAnim.index === dataSlider.length && !slideAnim.inProgress) {
      setSlideAnim({ index: 1, inProgress: true });
      setTimeout(() => {
        setSlideAnim({ index: 1, inProgress: false });
      }, 500);
    }
  };
  const prevSlide = () => {
    if (slideAnim.index !== 1 && !slideAnim.inProgress) {
      setSlideAnim({ index: slideAnim.index - 1, inProgress: true });
      setTimeout(() => {
        setSlideAnim({ index: slideAnim.index - 1, inProgress: false });
      }, 500);
    } else if (slideAnim.index === 1 && !slideAnim.inProgress) {
      setSlideAnim({ index: 5, inProgress: true });
      setTimeout(() => {
        setSlideAnim({ index: 5, inProgress: false });
      }, 500);
    }
  };

  const moveDot = (index) => {
    setSlideAnim({ index: index, inProgress: false });
  };

  return (
    <div className="container-slider">
      {/* methode map qui retourne un nouveau tableau et j'appel la valeur courante obj */}
      {dataSlider.map((obj, index) => {
        return (
          <div
            //la clé unique générée par uuid dans le fichier dataSlider qui est importé
            key={obj.id}
            // index = 0 dans avec le map et démarre a 1 via useState donc 0+1...
            className={
              // si index =1 on lui donne la classe correspondante sinon l'autre classe
              slideAnim.index === index + 1 ? "slide active-anim" : "slide"
            }
          >
            <img
              src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`}
              alt=""
            />
          </div>
        );
      })}

      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots">
        {Array.from({ length: 5 }).map((item, index) => {
          return (
            <button
              className={slideAnim.index === index + 1 ? "dot active" : "dot"}
              onClick={() => {
                moveDot(index + 1);
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
