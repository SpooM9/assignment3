import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface AdminStore {
    isSuperAdmin: boolean,
    id: string,
    name: string,
    profileUrl: string,
    authKey: string
}

const initialState: AdminStore = {
    isSuperAdmin: false,
    id: '',
    name: '',
    profileUrl: '',
    authKey: ''
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setIsSuper: (state, action: PayloadAction<boolean>) => {
            state.isSuperAdmin = action.payload
        },
        setLoginDetails: (state, action: PayloadAction<{
            authKey: string,
            id: string,
            name: string,
            profileUrl: string
        }>) => {
            state.id = action.payload.id
            state.authKey = action.payload.authKey
            state.name = action.payload.name
            state.profileUrl = action.payload.profileUrl
        },
        logout: (state) => {
            state.authKey = ''
            state.id = ''
            state.isSuperAdmin = false
            state.name = ''
            state.profileUrl = ''
        }
    }
});

export const { logout, setIsSuper, setLoginDetails } = adminSlice.actions

export const selectIsSuper = (state: RootState) => state.admin.isSuperAdmin
export const selectAdminObj = (state: RootState) => {
    return {
        name: state.admin.name,
        id: state.admin.id,
        profileUrl: state.admin.profileUrl,
        authKey: state.admin.authKey
    }
}
export const isLoggedIn = (state: RootState) => {
    return {
        isAdmin: !!state.admin.id,
        isSuperUser: !!state.admin.id && state.admin.isSuperAdmin
    }
}

export default adminSlice.reducer;
