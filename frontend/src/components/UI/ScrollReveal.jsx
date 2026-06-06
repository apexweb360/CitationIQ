import useScrollReveal from "../../hooks/useScrollReveal";

export default function ScrollReveal({ children, className = "" }) {
  const [ref, visible] = useScrollReveal(0.2);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}