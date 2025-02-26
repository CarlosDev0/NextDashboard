"use client";
import { useRouter } from "next/navigation";

export default function Contacto() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <>
      <h1>Contacto</h1>
      <button onClick={handleClick}>Regresar a Home</button>
    </>
  );
}
