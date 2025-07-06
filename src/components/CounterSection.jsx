import React from "react";
import CounterBox from "./CounterBox";
import "../styles/CounterSection.css";

const CounterSection = () => {
  return (
    <section className="counter-section">
  <CounterBox value="20" label="Years of Excellence" />
  <CounterBox value="500" label="Students Enrolled" suffix="+" />
  <CounterBox value="100" label="Qualified Teachers" suffix="+" />
  <CounterBox value="95" label="Board Exam Success Rate" suffix="%" />
</section>

  );
};

export default CounterSection;
