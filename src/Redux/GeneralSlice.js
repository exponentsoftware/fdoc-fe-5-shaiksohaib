import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  AlbumData: [],
  searchString: "",
  playlist: [
    {
      id: 1,
      name: "demo 1",
      user: "username",
      cover:
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ceb0a114960774.56037a57f1752.jpg",
      songs: [],
    },
  ],
};
export const mainSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    removeAll: (state) => {
      state.status = "idle";
      state.AlbumData = [];
    },
    fakedataPopulate: (state, action) => {
      state.AlbumData = action.payload;
    },
    addNewAlbum: (state, { payload }) => {
      if (payload) state.AlbumData = [...state.AlbumData, payload];
    },
    deleteAlbum: (state, { payload }) => {
      if (payload)
        state.AlbumData = state.AlbumData.filter((x) => x.id !== payload);
    },
    updateSearch: (state, action) => {
      // console.log("mama", action?.payload);
      state.searchString = action?.payload;
    },
    createPlaylist: (state, action) => {
      let temp = [...state.playlist];
      let isAlreadyCreated = temp?.findIndex(
        (x) => x.name === action.payload.name
      );
      if (isAlreadyCreated === -1) {
        state.playlist = [...state.playlist, action.payload];
      } else {
        console.log("Same name already exists.");
      }
    },
    songAddRemove: (state, action) => {
      let { playlist_id, song } = action.payload;

      let isPlaylistAvailable = state.playlist?.findIndex(
        (x) => x.id === playlist_id
      );

      if (isPlaylistAvailable !== -1) {
        let isSongAvailable = state.playlist[
          isPlaylistAvailable
        ]?.songs?.findIndex((x) => x.id === song?.id);
        if (isSongAvailable === -1) {
          let temp = state.playlist[isPlaylistAvailable];
          temp.songs.push(song);
          // console.log("popo", state.playlist);
          state.playlist = state.playlist.splice(isPlaylistAvailable, 1, temp);
        } else {
          let temp = state.playlist[isPlaylistAvailable];
          temp.songs = temp.songs.filter((x) => x.id !== song.id);
          state.playlist = state.playlist.splice(isPlaylistAvailable, 1, temp);
        }
      }
    },
  },
});

export const {
  removeAll,
  fakedataPopulate,
  addNewAlbum,
  deleteAlbum,
  updateSearch,
  createPlaylist,
  songAddRemove,
} = mainSlice.actions;

export default mainSlice.reducer;
