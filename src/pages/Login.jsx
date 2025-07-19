import { useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Esquema de validação Yup
const LoginSchema = Yup.object({
  email: Yup.string().email("E-mail inválido").required("Informe o e-mail"),
  password: Yup.string().required("Informe a senha"),
});

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (values) => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/users/login", values);
      login(res.data.token); // usa o contexto
      window.location.href = "/users";
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                label="E-mail"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Senha"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
