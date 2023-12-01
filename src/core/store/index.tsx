import { create } from 'zustand';

export interface SetUserData {
    name: string;
    surname: string;
    color: string;
    stela: string;
}

interface State {
    userData: {
        uid: string;
        name?: string;
        surname?: string;
        color?: string;
        stela?: string;
    } | null;
    setUserUid: (uid: string) => void;
    setUserData: (userData: SetUserData) => void;
    removeUserData: () => void;
}

const useStore = create<State>((set) => ({
    userData: null,
    setUserUid: (uid: string) => set(() => ({ userData: { uid }})),
    setUserData: (userData: SetUserData) => set((state) => ({ userData: { uid: state.userData?.uid as string, ...userData} })),
    removeUserData: () => set({ userData: null }),
}));

export default useStore;
