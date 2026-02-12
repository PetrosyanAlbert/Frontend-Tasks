import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./usersApi";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const res = await api.getUsers();
    return res.data;
});

export const addUser = createAsyncThunk("users/add", async (user) => {
    const res = await api.createUser(user);
    return res.data;
});

export const removeUser = createAsyncThunk("users/remove", async (id) => {
    await api.deleteUser(id);
    return id;
});

export const editUser = createAsyncThunk("users/edit", async ({ id, data }) => {
    const res = await api.updateUser(id, data);
    return res.data;
});
