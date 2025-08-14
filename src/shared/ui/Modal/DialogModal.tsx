import { Button, ButtonTextColor } from "../Button/Button";
import { Modal, ModalProps } from "./Modal"

interface DialogModalProps extends ModalProps
{
    yesText: string;
    noText?: string;
    yesFunc?: () => void;
    noFunc?: () => void;
    yesColor?: ButtonTextColor;
    noColor?: ButtonTextColor;
}

export const DialogModal = (props: DialogModalProps) =>
{
    const { yesText, noText, yesFunc, noFunc, yesColor, noColor, ...modalProps } = props;
    
    return(
        <Modal {...modalProps}>
            <div className="flex flex-col w-full gap-8">
                {props.children}
                <div className="flex gap-4 justify-end">
                    {yesText && 
                        <Button color={yesColor} onClick={yesFunc ? yesFunc : props.onClose}>
                            {yesText}
                        </Button>
                    }
                    {noText && 
                        <Button color={noColor} onClick={noFunc ? noFunc : props.onClose}>
                            {noText}
                        </Button>
                    }
                </div>
            </div>
        </Modal>
    )
}