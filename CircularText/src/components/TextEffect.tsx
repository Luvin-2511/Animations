type Props = {
  text: "Animating";
};

const TextEffect = (props: Props) => {
  const splitText: string[] = props.text.split("");
  const radius = 100;
  return (
    <div className="text-wrapper">
      {splitText.map((letter, idx) => {
        const angle: number = (idx / (splitText.length - 1)) * Math.PI *2;
        return (
          <span
            style={{
              transform: `translate3d(
                ${Math.cos(angle) * radius}px,
                0,
                ${Math.sin(angle) * radius}px
              ) `,
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

export default TextEffect;
