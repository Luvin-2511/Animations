import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {
  text: string;
};

const ScrollEffect = (props: Props) => {
  const splitText: string[] = props.text.split("");
  const radius = 300;
  useGSAP(() => {
    gsap.to(".text-wrapper", {
      rotateY: -360,
      rotateZ: -360,
      rotateX: -360,
      duration: 5,
      ease: "none",
      repeat: -1,
    });
  }, []);
  return (
    <div className="text-wrapper">
      {splitText.map((letter, idx) => {
        const angle: number = (idx / (splitText.length )) * Math.PI *2 ;
        return (
          <span
            style={{
              transform: `translate3d(
                ${Math.cos(angle) * radius}px,
                0,
                ${Math.sin(angle) * radius}px
              ) 
                 rotateY(${Math.PI / 2 - angle}rad)`,
            }}
            className="rounded-letter"
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default ScrollEffect;
