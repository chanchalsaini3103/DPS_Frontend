import React, { useEffect, useRef, useState } from "react";

const CounterBox = ({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [value]);

  const animateCount = () => {
    let start = 0;
    const end = parseInt(value);
    const duration = 1000;
    const stepTime = Math.max(Math.floor(duration / end), 10);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
  };

  return (
    <div className="counter-box" ref={ref}>
      <h1 className="count">{count}{suffix}</h1>
      <p className="label">{label}</p>
    </div>
  );
};

export default CounterBox;
