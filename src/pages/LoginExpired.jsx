import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

export default function LoginExpired() {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const countdown = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 12 }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sua sessão expirou.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Por segurança, você foi desconectado.
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Redirecionando para o login em <strong>{counter}</strong> segundos...
        </Typography>

        <CircularProgress size={30} sx={{ mb: 3 }} />

        <Box>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            color="primary"
          >
            Ir para login agora
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
