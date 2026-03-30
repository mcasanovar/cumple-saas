"use client";

import { useState, useCallback, useTransition } from "react";
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

  const openModal = useCallback((invitation: DeleteInvitationData) => {
    setSelectedInvitation(invitation);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedInvitation(null);
  }, []);

  const handleDelete = useCallback(() => {
    if (!selectedInvitation) return;

    const formData = new FormData();
    formData.append("invitationId", selectedInvitation.invitationId);

    startTransition(() => {
      formAction(formData);
    });
  }, [selectedInvitation, formAction, startTransition]);

  // Auto-close modal on success
  if (state.status === "success" && isModalOpen) {
    setTimeout(() => {
      closeModal();
    }, 1500);
  }

  return {
    isModalOpen,
    selectedInvitation,
    state,
    isPending,
    openModal,
    closeModal,
    handleDelete,
  };
}
