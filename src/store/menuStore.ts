import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type MenuItem = {
    id: string,
    name: string,
    subText: string,
    picture: string
}

export interface MenuItemStore {
    menu: [MenuItem] | []
}

const initialState: MenuItemStore = {
    menu: []
};

export const menuItemSlice = createSlice({
    name: 'menuItem',
    initialState,
    reducers: {
        addMenu: (state, action: PayloadAction<[MenuItem]>) => {
            state.menu = action.payload
        }
    }
});

export const selectMenu = (state: RootState) => state.menuItems.menu;

export default menuItemSlice.reducer;
