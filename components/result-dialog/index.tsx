import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface IResultDialog {
  messageTitle: string
  message: string,
  isOpen: boolean
}

export default function ResultDialog({ messageTitle, message, isOpen }: IResultDialog) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{messageTitle}</DialogTitle>
          <DialogDescription>
            {message}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
