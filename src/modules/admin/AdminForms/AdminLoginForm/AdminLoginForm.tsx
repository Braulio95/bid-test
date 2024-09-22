/* eslint-disable @typescript-eslint/no-explicit-any */
import { B4CButton } from "@/components/B4CButton";
import { B4CTextfield } from "@/components/B4CTextfield";
import { Box, Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ValidationSchema } from "./ValidationSchema";
import { AdminLoginService } from "@/services/adminServices/AdminLoginService";
import { useAdminSession } from "@/context/session/AdminSessionContext";

export const AdminLoginForm = () => {
  const { setToken } = useAdminSession();
  const [visible, setVisible] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values.email, values.password);
        const userData = await AdminLoginService(values.email, values.password);
        if (userData) {
          console.log("Usuario conectado:", userData);

          localStorage.setItem("userToken", userData.token);

          const storedToken = localStorage.getItem("userToken");
          if (storedToken) {
            setToken(storedToken);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  const handleVisiblePassword = () => {
    setVisible(!visible);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: "inherit",
        flexDirection: "inherit",
        gap: "inherit",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          width: "70%",
          marginInline: "auto",
          color: "#666666",
        }}
      >
        {
          "Por favor, complete sus datos de inicio de sesión de administrador únicos a continuación."
        }
      </Typography>

      <B4CTextfield
        label="Correo elecrónico"
        value={formik.values.email}
        onChange={formik.handleChange}
        name="email"
        required
      />

      <Box>
        <B4CTextfield
          label="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
          isPassword
          isVisible={visible}
          onClick={handleVisiblePassword}
          required
        />

        <Typography
          variant="body-large-bold"
          sx={{
            display: "inline",
            marginLeft: "65%",
            marginTop: "16px",
            color: "#999999",
          }}
        >
          <Link
            href={"/admin/login/olvide-contrasena"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {"¿Olvidaste tu contraseña?"}
          </Link>
        </Typography>
      </Box>
      <B4CButton
        onClick={formik.handleSubmit}
        variant="primary"
        label="Entrar a Admin Dashboard"
      />
    </form>
  );
};
