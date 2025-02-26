"use client";

const Button = (props: { message: string; text: string }) => {
  return <button onClick={() => alert(props.message)}>{props.text}</button>;
};

export default Button;
