/*https://youtu.be/dDLX4XDaz7A'*/
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Container from "../../../components/Container";
import FormField from "../../../components/form/FormField";
import {
  EmpleadoSchema,
  EmpleadoSchemaType,
} from "../../../schemas/EmpleadoSchema";

import { createEmployee } from "../formerEmpleado/postServerActions";
import "./newEmployee.css";

export default function NewEmpleado() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmpleadoSchemaType>({
    resolver: zodResolver(EmpleadoSchema),
  });

  useEffect(() => {
    if (success) {
      reset();
      const timer = setTimeout(() => {
        setSuccess(undefined);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Reset errors on new submit
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(undefined);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onSubmit: SubmitHandler<EmpleadoSchemaType> = (data) => {
    setLoading(true);

    createEmployee(data)
      .then((result) => {
        setError(result.error);
        setSuccess(result.success);
        if (result.success) reset();
      })
      .finally(() => setLoading(false));
  };
  return (
    <Container>
      <h1>CREATE A NEW EMPLOYEE (WITH FETCH):</h1>
      <h3>
        This is an example of a form that uses Fetch to create a new record.
      </h3>
      <h3>Please fill out every field:</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[500px] m-auto "
      >
        <FormField
          id="nombre"
          disabled={loading}
          register={register}
          placeholder="Nombre"
          errors={errors}
          type="text"
        />
        <FormField
          id="Cedula"
          disabled={loading}
          register={register}
          placeholder="Id"
          errors={errors}
          type="text"
        />
        <FormField
          id="password"
          disabled={loading}
          register={register}
          placeholder="Password"
          errors={errors}
          type="text"
        />
        <FormField
          id="username"
          disabled={loading}
          register={register}
          placeholder="Username"
          errors={errors}
          type="text"
        />
        {!loading && error && <div className="message error">{error}</div>}
        {!loading && success && (
          <div className="message success">{success}</div>
        )}
        <button
          disabled={loading}
          className="submit-btn"
          // className="rounded-md hover:opacity-80 transition w-auto border-slate-300 flex items-center justify-center gap-2 py-3 px-5 border-2 bg-slate-700 text-white my-2"
        >
          {loading ? "Submitting" : "Submit"}
        </button>
      </form>
    </Container>
  );
}
