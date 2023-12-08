export interface TranslationModalProps {
  isOpen: boolean;
  text: string;
  language: string;
  englishTranslation: string;
  onClose: () => void;
}
