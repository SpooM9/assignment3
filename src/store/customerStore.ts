import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem } from './menuStore';
import { RootState } from './store';

export enum CustomerType {
    DININ = 'DININ',
    DELIVER = 'DELIVER'
}

export interface CustomerState {
    type: CustomerType,
    cart: [MenuItem["id"]] | [],
}

const initialState: CustomerState = {
    type: CustomerType.DININ,
    cart: [],
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setType: (state, action: PayloadAction<CustomerType>) => {
            state.type = action.payload
        },
        setCartDetails: (state, action: PayloadAction<[MenuItem["id"]] | []>) => {
            state.cart = action.payload
        }
    }
});
export const { setType, setCartDetails } = customerSlice.actions

export const selectCart = (state: RootState) => state.customer.cart;
export const selectType = (state: RootState) => state.customer.type;

export default customerSlice.reducer;
