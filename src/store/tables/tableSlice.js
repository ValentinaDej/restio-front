import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tablesData: null,
};

const tableSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setTablesData: (state, action) => {
      if (state.tablesData === null) {
        state.tablesData = action.payload;
      } else {
        const newTablesData = action.payload.map((newTable) => {
          const existingTable = state.tablesData.find((table) => table._id === newTable._id);
          if (existingTable) {
            return { ...newTable, isFavorite: existingTable.isFavorite };
          }
          return newTable;
        });
        state.tablesData = newTablesData;
      }
    },
    setFavorite: (state, action) => {
      state.tablesData = state.tablesData.map((table) =>
        table._id === action.payload ? { ...table, isFavorite: !table.isFavorite } : table
      );
    },
  },
});

export const { setTablesData, setFavorite } = tableSlice.actions;
export default tableSlice.reducer;
