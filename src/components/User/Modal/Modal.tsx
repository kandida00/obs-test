import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import User from '../../../models/User';
import styles from './Modal.module.css';
import { addUser, editUser } from '../../../store/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useState, useEffect } from 'react';
import { RootState } from '../../../store';

type ModalProps = {
  openModal: boolean;
  onClose: () => void;
  selectedUser: User | null;
  viewOnly: boolean;
};

export const ModalUser = ({
  openModal,
  onClose,
  selectedUser,
  viewOnly
}: ModalProps) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const defaultForm: User = {
    id: users.length + 1,
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  };

  const [user, setUser] = useState<User>(defaultForm);

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser(defaultForm);
    }
  }, [selectedUser]);

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (selectedUser) {
      dispatch(editUser(user));
    } else {
      dispatch(addUser(user));
    }
    onClose();
  };

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      aria-labelledby="edit-user-modal"
      aria-describedby="edit-user-modal-description"
    >
      <Box className={isMobile ? styles.modal_mobile : styles.modal}>
        <Typography variant="h6" component="h2" gutterBottom>
          {viewOnly ? 'View User' : selectedUser ? 'Edit User' : 'Add User'}
        </Typography>
        {user && (
          <>
            <TextField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleUserChange}
              fullWidth
              margin="normal"
              slotProps={{
                input: {
                  readOnly: viewOnly
                }
              }}
            />
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              fullWidth
              margin="normal"
              slotProps={{
                input: {
                  readOnly: viewOnly
                }
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              fullWidth
              margin="normal"
              slotProps={{
                input: {
                  readOnly: viewOnly
                }
              }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={handleUserChange}
              fullWidth
              margin="normal"
              slotProps={{
                input: {
                  readOnly: viewOnly
                }
              }}
            />
            <TextField
              label="Website"
              name="website"
              value={user.website}
              onChange={handleUserChange}
              fullWidth
              margin="normal"
              slotProps={{
                input: {
                  readOnly: viewOnly
                }
              }}
            />
            <div className={styles.button_container}>
              <Button variant="contained" color="primary" onClick={onClose}>
                Close
              </Button>
              {!viewOnly && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              )}
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};
