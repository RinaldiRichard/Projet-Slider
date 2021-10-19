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
    if (slideAnim.index !== dataSlider.length) {

      setSlideAnim({ index: slideAnim.index + 1, 
      inProgress: true });

    } 
    
    else if (slideAnim.index === dataSlider.length) {

      setSlideAnim({ index: 1, inProgress: true });

    }
  };
  const prevSlide = () => {
     if (slideAnim.index !== dataSlider.length) {
       setSlideAnim({ index: slideAnim.index - 1, inProgress: true });
     }
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
    </div>
  );
}
