'use client';

import React, { useRef, useEffect, useId } from 'react';
import styled from 'styled-components';
import { FaXmark } from 'react-icons/fa6';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.medium};
  right: ${({ theme }) => theme.spacing.medium};
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    testId?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, testId }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const titleId = useId();

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent ref={modalRef} onClick={(e) => e.stopPropagation()} aria-modal="true" aria-labelledby={title ? titleId : undefined} {...(testId && { 'data-testid': testId })} >
                <CloseButton onClick={onClose}>
                    <FaXmark />
                </CloseButton>
                {title && <h2 id={titleId}>{title}</h2>}
                {children}
            </ModalContent>
        </ModalOverlay>
    );
};