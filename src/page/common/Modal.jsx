import React, {useState} from 'react'

const Modal = () => {
    // 모달 상태변수, 모달 Open 업데이트 함수
    const [modalId, setOpenModal] = useState(null); // 기본값은 null(modal open x)

    /**
     * ID에 맞는 모달을 연다.
     * @param modalId
     */
    const openModal = (modalId) => {
        setOpenModal(modalId);
    }

    // 클릭된 모달을 닫는다.
    const closeModal = () => {
        setOpenModal(null);
    }

    // 모달을 여는 이벤트
    const clickModalEvent = (e) => {
        e.preventDefault(); // 이벤트 전파 방지
        const modalId = e.currentTarget.id
        if (modalId) {
            openModal(modalId);
        }
    }

    return {modalId, openModal, closeModal, clickModalEvent};
}

export default Modal;