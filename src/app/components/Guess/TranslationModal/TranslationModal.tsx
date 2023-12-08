import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { TranslationModalProps } from "./TranslationModal.types";
import { ArrowDownIcon } from "@chakra-ui/icons";

export const TranslationModal = ({
  isOpen,
  onClose,
  text,
  language,
  englishTranslation,
}: TranslationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>English translation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col justify-center text-center items-center gap-3">
            {englishTranslation}
            <ArrowDownIcon fontSize="lg" />
            {text}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
