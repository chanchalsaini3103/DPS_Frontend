import React from "react";
import CounterBox from "./CounterBox";
import "../styles/CounterSection.css";

const CounterSection = () => {
  return (
    <section className="counter-section">
      <CounterBox value="20" label="Years of Legacy" />
      <CounterBox value="100" label="University Placements" suffix="%" />
      <CounterBox value="27" label="Nationalities" />
      <CounterBox value="100" label="Student Leadership Opportunities" suffix="+" />
    </section>
  );
};

export default CounterSection;
