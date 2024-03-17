import { create } from 'zustand'


export const useSignInStore = create((set) => ({
    isOpen: false,
    setOpen:()  => set ({isOpen:true}),
    setClose: () => set({isOpen:false})
    
  }))



export const useSignUpStore = create((set) => ({
    isOpen: false,
    setOpen:()  => set ({isOpen:true}),
    setClose: () => set({isOpen:false})
    
  }))



export const useNewPostWindow = create((set) => ({
    isOpen: false,
    setOpen:()  => set ({isOpen:true}),
    setClose: () => set({isOpen:false})
    
  }))