import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormEntry {
  id?: string;
  name: string;
  description: string;
  date: string;
  priority: string;
  status: boolean;
}

interface FormDataState {
  data: FormEntry[];
  editId: string | null;
  searchResults: FormEntry[];
}

const initialState: FormDataState = {
  data: [],
  editId: null,
  searchResults: [],
};

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormEntry>) => {
      state.data.push(action.payload);
      //   state.name = action.payload.name;
      //   state.date = action.payload.date;
    },

    searchTodoData: (state, action: PayloadAction<string>) => {
      const keyword = action.payload.toLowerCase();
      console.log(keyword, "keyword");
      if (keyword.length > 0) {
        const searchdata = state.data.filter((item) =>
          item.name.toLowerCase().includes(keyword)
        );
        console.log(searchdata, "searchdatasearchdatasearchdata");
        state.searchResults = searchdata;
      } else {
        state.searchResults = [];
      }
    },

    seteditData: (state, action: PayloadAction<string>) => {
      state.editId = action.payload;
    },

    updateFormData: (
      state,
      action: PayloadAction<{ id: string; updated: FormEntry }>
    ) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload.updated : item
      );
      state.editId = null;
    },

    updateComplete: (
      state,
      action: PayloadAction<{ id: string; status: boolean }>
    ) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id
          ? { ...item, status: action.payload.status }
          : item
      );
    },

    deleteData: (state, action: PayloadAction<{ id: string }>) => {
      const filterData = state.data.filter(
        (item) => item.id !== action.payload.id
      );
      state.data = filterData;
    },

    clearFormData: (state) => {
      state.data = [];
      state.editId = null;
    },
  },
});

export const {
  setFormData,
  seteditData,
  searchTodoData,
  updateFormData,
  updateComplete,
  deleteData,
  clearFormData,
} = formDataSlice.actions;

export default formDataSlice.reducer;
