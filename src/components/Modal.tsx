import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react'
import Button from './ui/Button'

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({isOpen, onClose, title}: IModalProps) => {

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={() => onClose()}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-cyan-500 shadow-lg p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {title && <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                {title}
              </DialogTitle>}
              
              <div className="mt-4 flex space-x-3">
                <Button onClick={close} className="bg-indigo-700 hover:bg-indigo-800" width="w-full">Close</Button>
                <Button onClick={close} className="bg-gray-400 hover:bg-gray-500" width="w-full">Cancel</Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Modal;