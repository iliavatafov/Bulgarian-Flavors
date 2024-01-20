import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  login: false,
  register: false,
  resetPassword: false,
  profile: false,
  updateProfile: false,
  errorData: {
    isError: false,
    message: "",
    title: "",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    openModal(state, action) {
      state[action.payload] = true;
      Object.keys(state).forEach((el) => {
        if (el !== action.payload && el !== "errorData") {
          state[el] = false;
        }
      });
    },
    closeModal() {
      return initialModalState;
    },
    setErrorData(state, action) {
      state.errorData = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
