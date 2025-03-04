'use client'

import { Input } from "@/components/ui/input";
import { ReactNode, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface IInputCopy {
  toastMessage: string,
  ToastIcon: ReactNode,
  inputProps: React.InputHTMLAttributes<HTMLInputElement>,
  buttonText?: string
}

export default function InputCopy({ toastMessage, ToastIcon, inputProps, buttonText }: IInputCopy) {
  const inputRef = useRef<HTMLInputElement>(null)

  function copyInputValueToClipboard() {
    inputRef.current?.select();
    inputRef.current?.setSelectionRange(0, 99999);
    if (inputRef.current?.value) {
      navigator.clipboard.writeText(inputRef.current?.value);
      toast(toastMessage, {
        icon: ToastIcon
      })
    }
  }

  return (
    <>
      <Tooltip>
        <Input type="url" readOnly placeholder={inputProps.placeholder} value={inputProps.value} ref={inputRef} />
        <TooltipTrigger asChild>
          <Button onClick={copyInputValueToClipboard}>
            <ClipboardCopy /> {buttonText}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copiar</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
