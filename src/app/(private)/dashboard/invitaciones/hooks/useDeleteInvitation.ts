"use client";

import { useState, useCallback, useTransition, useEffect } from "react";
import { useActionState } from "react";
import { deleteInvitation, type DeleteInvitationState } from "@/app/(private)/dashboard/invitaciones/actions";

export type DeleteInvitationData = {
  invitationId: string;
  title: string;
  guests: number;
};

export type UseDeleteInvitationReturn = {
  isModalOpen: boolean;
  selectedInvitation: DeleteInvitationData | null;
  state: DeleteInvitationState;
  isPending: boolean;
  openModal: (invitation: DeleteInvitationData) => void;
  closeModal: () => void;
  handleDelete: () => void;
};

export function useDeleteInvitation(): UseDeleteInvitationReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState<DeleteInvitationData | null>(null);
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState<DeleteInvitationState, FormData>(
    deleteInvitation,
    { status: "idle" }
  );

  // Estado local para la UI que podemos resetear
  const [uiState, setUiState] = useState<DeleteInvitationState>({ status: "idle" });

  // Sincronizar el estado de la acción con la UI
  useEffect(() => {
    if (state.status !== "idle") {
      setUiState(state);
    }
  }, [state]);

  const openModal = useCallback((invitation: DeleteInvitationData) => {
    setUiState({ status: "idle" }); // Resetear estado al abrir
    setSelectedInvitation(invitation);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedInvitation(null);
    setUiState({ status: "idle" }); // Resetear estado al cerrar
  }, []);

  const handleDelete = useCallback(() => {
    if (!selectedInvitation) return;

    const formData = new FormData();
    formData.append("invitationId", selectedInvitation.invitationId);

    startTransition(() => {
      formAction(formData);
    });
  }, [selectedInvitation, formAction]);

  // Auto-close modal on success
  useEffect(() => {
    if (uiState.status === "success" && isModalOpen) {
      const timer = setTimeout(() => {
        closeModal();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [uiState.status, isModalOpen, closeModal]);

  return {
    isModalOpen,
    selectedInvitation,
    state: uiState,
    isPending,
    openModal,
    closeModal,
    handleDelete,
  };
}
