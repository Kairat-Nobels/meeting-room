import React from "react";
import { Dialog } from "@headlessui/react";
import { FaWhatsapp } from "react-icons/fa";
import payment from '../assets/images/payment.jpg'
type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          ×
        </button>
        <Dialog.Title className="text-4xl font-semibold text-center mb-2">
          Оплата
        </Dialog.Title>
        <p className="text-center text-gray-700 font-semibold mb-2 text-[16px]">
          Произведите оплату по этим реквизитам и отправьте чек на WhatsApp
        </p>
        <img
          src={payment}
          alt="Реквизиты для оплаты"
          className="w-[80%] mx-auto w-max-[300px] h-max-[300px] rounded-[10px] border mb-2 overflow-hidden"
        />
        <a
          href="https://wa.me/996550789907" target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 bg-green-500 hover:bg-green-600 text-white text-base font-medium py-3 px-4 rounded-lg transition hover:text-white"
        >
          {/* Тут добавь иконку WhatsApp */}
          <div className="flex items-center justify-center gap-2">
            <FaWhatsapp className="text-4xl mx-auto" />
            <p className="text-[20px]">Отправить чек</p>
          </div>
        </a>
      </Dialog.Panel>
    </Dialog>
  );
};

export default PaymentModal;
