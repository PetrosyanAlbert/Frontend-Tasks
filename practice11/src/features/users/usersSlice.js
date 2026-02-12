import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { addUser, editUser, fetchUsers, removeUser } from "./usersThunks";

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? "Failed to fetch users";
            })

            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? "Failed to add user";
            })

            .addCase(removeUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter(
                    (u) => u.id !== action.payload
                );
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? "Failed to delete user";
            })

            .addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex(
                    (u) => u.id === action.payload.id
                );

                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? "Failed to update user";
            });
    },
});
export default usersSlice.reducer;