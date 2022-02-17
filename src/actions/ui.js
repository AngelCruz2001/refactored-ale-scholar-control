import { types } from '../types/types';

export const uiStartLoading = () => ({
    type: types.uiStartLoading,
});
export const uiFinishLoading = () => ({
    type: types.uiFinishLoading,
})
export const uiStartLoadingDocument = () => ({
    type: types.uiStartLoadingDocument,
});
export const uiFinishLoadingDocument = () => ({
    type: types.uiFinishLoadingDocument,
})
export const uiSetCorrect = () => ({
    type: types.uiSetCorrect,
})

export const uiStartLoadingCards = () => ({
    type: types.uiStartLoadingCards,
});
export const uiFinishLoadingCards = () => ({
    type: types.uiFinishLoadingCards,
});

export const uiSetCurrent = (current) => ({
    type: types.uiSetCurrent,
    payload: current
})

export const uiSetModalOpen = (isModalOpen) => ({
    type: types.uiIsModalOpen,
    payload: isModalOpen
})
export const uiSetShowHistory = (isShowHistoryOpen) => ({
    type: types.uiIsShowHistoryOpen,
    payload: isShowHistoryOpen
})

export const uiIsSubMenuOpen = (name) => ({
    type: types.uiIsSubMenuOpen,
    payload: name
})


