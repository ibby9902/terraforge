import { create} from "zustand";

interface useCreateProjectModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useCreateProjectModal = create<useCreateProjectModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))