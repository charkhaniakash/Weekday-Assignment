import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";



//  fetching the dat from the api using AsyncThunk

export const showJobs = createAsyncThunk(
  "showJobs",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


// initializing the states


const initialState = {
  jobs: [],
  loading: false,
  error: null,
  searchCompany: [],
};

export const jobPosting = createSlice({
  name: "jobPosting",
  initialState,

  reducers: {
    searchCompanyNameData: (state, action) => {
      state.searchCompany = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(showJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(showJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(showJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jobPosting.reducer;

export const { searchCompanyNameData } = jobPosting.actions;
