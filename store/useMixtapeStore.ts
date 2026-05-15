import { create } from "zustand";

type Song = {
  title: string;
  artist: string;
  audioUrl: string;
};

type MixtapeState = {
  creator: string;
  receiver: string;
  songs: Song[];
  cassetteColor: string;

  setCreator: (name: string) => void;
  setReceiver: (name: string) => void;
  addSong: (song: Song) => void;
  setCassetteColor: (color: string) => void;
};

export const useMixtapeStore =
  create<MixtapeState>((set) => ({
    creator: "",
    receiver: "",
    songs: [],
    cassetteColor: "#f9a8d4",

    setCreator: (name) =>
      set({ creator: name }),

    setReceiver: (name) =>
      set({ receiver: name }),

    addSong: (song) =>
      set((state) => ({
        songs:
          state.songs.length >= 10
            ? state.songs
            : [...state.songs, song],
      })),

    setCassetteColor: (color) =>
      set({ cassetteColor: color }),
  }));