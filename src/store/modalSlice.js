import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  login: false,
  register: false,
  resetPassword: false,
  profile: false,
  updateProfile: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal(state, action) {
      state[action.payload] = true;
      Object.keys(state).forEach((el) => {
        if (el !== action.payload) {
          state[el] = false;
        }
      });
    },
    closeModal() {
      return initialModalState;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
