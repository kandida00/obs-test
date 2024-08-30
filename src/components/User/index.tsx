import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from '@mui/material';
import { RootState } from '../../store';
import User from '../../models/User';
import { deleteUser, selectUser, setUsers } from '../../store/UserSlice';
import { ModalUser } from './Modal/Modal';
import styles from './User.module.css';

export const UserComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const selectedUser = useSelector(
    (state: RootState) => state.user.selectedUser
  );
  const [viewOnly, setViewOnly] = useState(false);

  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    fetch('/data/users.json')
      .then((response) => response.json())
      .then((data: User[]) => {
        dispatch(setUsers(data));
      })
      .catch((error) => {
        alert(error);
      });
  }, [dispatch]);

  const handleOpenModal = (user: User | null, viewOnly: boolean) => {
    dispatch(selectUser(user?.id || null));
    setViewOnly(viewOnly);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    dispatch(selectUser(null));
    setOpenModal(false);
  };

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal(null, false)}
        sx={{ mb: 2 }}
      >
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 350 }}>
          <TableHead>
            <TableRow>
              <TableCell>Picture</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <img
                    src={`https://picsum.photos/50?random=${user.id}`}
                    alt="Profile"
                    className={styles.picture}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className={styles.actions}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(user, true)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(user, false)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalUser
        openModal={openModal}
        onClose={handleCloseModal}
        selectedUser={selectedUser}
        viewOnly={viewOnly}
      />
    </>
  );
};
