import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../services/userService";

export default function UserIndex() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState({
    type: "include",
    ids: new Set(),
  });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1.5 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  const handleEdit = () => {
    const user = users.find((u) => u.id === Array.from(selectedUserId.ids)[0]);
    console.log("Editar:", user);
    // abrir modal ou navegar
  };

  const handleDelete = async () => {
    debugger;
    const id = Array.from(selectedUserId.ids)[0];
    try {
      await userService.remove(id);
      setOpenDialog(false);
      fetchUsers(); // Recarrega a lista
      setSelectedUserId({ type: "include", ids: new Set() });
      toast.success("Usuário excluído com sucesso.");
    } catch (error) {
      toast.error("Erro ao excluir usuário.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Usuários</Typography>
        <Box display="flex" gap="5px">
          <Button variant="contained" size="small" startIcon={<Add />}>
            Novo
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<Edit />}
            disabled={!selectedUserId?.ids?.size}
            onClick={handleEdit}
          >
            Editar
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            startIcon={<Delete />}
            disabled={!selectedUserId?.ids?.size}
            onClick={() => setOpenDialog(true)}
          >
            Deletar
          </Button>
        </Box>
      </Box>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={users}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          columns={columns}
          loading={loading}
          pageSizeOptions={[25, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          columnHeaderHeight={36}
          rowHeight={40}
          showToolbar
          onRowSelectionModelChange={(newSelection) => {
            setSelectedUserId(newSelection);
          }}
          rowSelectionModel={selectedUserId}
        />
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir o usuário selecionado? Essa ação
              não poderá ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
}
