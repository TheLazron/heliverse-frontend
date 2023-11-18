import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { LoginFormValues } from "../components/LoginCard";
import { SignupFormValues } from "../components/signupCard";

const initialState = {
  jwtToken: null,
  user: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData: LoginFormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        userData
      );
      console.log(response, "user login successful");
      return response.data;
    } catch (error) {
      console.log("user login failed", error);
      throw error;
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: SignupFormValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        userData
      );
      console.log(response, "user signup successful");
      // You can return any data from the async function as the fulfilled action payload
      return response.data;
    } catch (error) {
      console.log("user signup failed", error);
      // You can also throw an error to be handled by the rejected action
      throw error;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwtToken = null;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("action payload found", action.payload);
        state.jwtToken = action.payload.data.token;
        state.user = action.payload.data.user;
      }
    }),
      builder.addCase(signup.fulfilled, (_state, action) => {
        console.log("signup successful", action.payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
