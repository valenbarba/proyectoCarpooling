import { useId } from "react";
import { createPortal } from "react-dom";
import "./ModalConfirmacion.css";

function ModalConfirmacion({
  isOpen,
  titulo,
  descripcion,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) {
  const tituloId = useId();
  const descripcionId = useId();

  if (!isOpen) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onCancel?.();
    }
  };

  return createPortal(
    <div
      className="modal-confirmacion__overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={tituloId}
      aria-describedby={descripcion ? descripcionId : undefined}
      onClick={handleOverlayClick}
    >
      <div className="modal-confirmacion__contenedor">
        <h3 id={tituloId} className="modal-confirmacion__titulo">
          {titulo}
        </h3>
        {descripcion && (
          <p id={descripcionId} className="modal-confirmacion__descripcion">
            {descripcion}
          </p>
        )}

        <div className="modal-confirmacion__acciones">
          <button
            type="button"
            className="modal-confirmacion__btn modal-confirmacion__btn--secundario"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="modal-confirmacion__btn modal-confirmacion__btn--primario"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ModalConfirmacion;
