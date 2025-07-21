import { Container, Typography, Button, Box } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code") || "Erro";
  const message =
    searchParams.get("message") || "Ocorreu um problema inesperado.";

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 12 }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "#fff3f3",
        }}
      >
        <Typography variant="h3" color="error" gutterBottom>
          {code}
        </Typography>

        <Typography variant="h5" gutterBottom>
          {message}
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Você pode tentar novamente mais tarde ou voltar à página inicial.
        </Typography>

        <Button variant="contained" component={Link} to="/">
          Voltar para o início
        </Button>
      </Box>
    </Container>
  );
}
