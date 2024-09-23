// Importing required libraries
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/interfaces";

export const emptyUserState: IUser = {
  id: 0,
  name: "",
  doc_number: "",
  email: "",
  role: {
    id: 0,
    name: "",
    permissions: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: emptyUserState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.doc_number = action.payload.doc_number;
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
