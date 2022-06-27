import "./style.scss";

export function Devider({ bg = "ntr-r", className }) {
  return (
    <div className={`devider-component border-r-2 bg-${bg} ${className}`}></div>
  );
}
