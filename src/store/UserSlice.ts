import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface UserState {
  users: User[];
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    selectUser(state, action: PayloadAction<number | null>) {
      state.selectedUser = action.payload
        ? state.users.find((user) => user.id === action.payload) || null
        : null;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    editUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    }
  }
});

export const { setUsers, selectUser, addUser, editUser, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;
