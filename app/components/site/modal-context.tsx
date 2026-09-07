"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import JoinUsModal from "../modals/JoinUsModal";
import BusinessSupportModal from "../modals/BusinessSupportModal";
import SpeakerApplicationModal from "../modals/SpeakerApplicationModal";
import CyberSecurityTrainingModal from "../modals/CyberSecurityTrainingModal";
import NominateChangeMakerModal from "../modals/NominateChangeMakerModal";
import VolunteerModal from "../modals/voluteerModal";

export type ModalKey =
  | "join"
  | "business"
  | "speaker"
  | "nominate"
  | "cyber"
  | "volunteer";

type SiteModalContextValue = {
  activeModal: ModalKey | null;
  openModal: (key: ModalKey) => void;
  closeModal: () => void;
};

const SiteModalContext = createContext<SiteModalContextValue | null>(null);

/**
 * Mounts every application form once for the whole site so that any button on
 * any page (including server components, via ModalButton) can open one.
 */
export function SiteModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);

  const openModal = useCallback((key: ModalKey) => setActiveModal(key), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const value = useMemo(
    () => ({ activeModal, openModal, closeModal }),
    [activeModal, openModal, closeModal]
  );

  return (
    <SiteModalContext.Provider value={value}>
      {children}

      <JoinUsModal isOpen={activeModal === "join"} onClose={closeModal} />
      <BusinessSupportModal
        isOpen={activeModal === "business"}
        onClose={closeModal}
      />
      <SpeakerApplicationModal
        isOpen={activeModal === "speaker"}
        onClose={closeModal}
      />
      <NominateChangeMakerModal
        isOpen={activeModal === "nominate"}
        onClose={closeModal}
      />
      <CyberSecurityTrainingModal
        isOpen={activeModal === "cyber"}
        onClose={closeModal}
      />
      <VolunteerModal isOpen={activeModal === "volunteer"} onClose={closeModal} />
    </SiteModalContext.Provider>
  );
}

export function useSiteModal() {
  const context = useContext(SiteModalContext);

  if (!context) {
    throw new Error("useSiteModal must be used inside a SiteModalProvider");
  }

  return context;
}
