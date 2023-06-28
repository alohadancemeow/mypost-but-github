import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string | React.ReactNode;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed z-10 inset-0 bg-neutral-900/90 backdrop-blur-sm" />
        <Dialog.Content
          className="
            fixed 
            left-[50%] 
            top-[50%] 
            h-full 
            max-h-full 
            w-full 
            translate-x-[-50%] 
            translate-y-[-50%] 
            rounded-md 
            border 
            border-neutral-700 
            bg-neutral-800 
            p-[25px] 
            drop-shadow-md 
            focus:outline-none 
            md:h-auto 
            md:max-h-[85vh] 
            md:w-[90vw] 
            md:max-w-[450px]
            z-10
          "
        >
          <Dialog.Title className="mb-4 text-center text-xl font-bold ">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-10 text-center text-white text-sm leading-normal ">
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
                absolute 
                right-[10px] 
                top-[10px] 
                inline-flex 
                h-[25px] 
                w-[25px] 
                appearance-none 
                items-center 
                justify-center 
                rounded-full 
                text-neutral-400 
                hover:text-white 
                focus:outline-none
              "
              aria-label="Close"
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
