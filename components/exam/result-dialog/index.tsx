import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Share } from "lucide-react"

interface IResultDialog {
  messageTitle: string
  message: string,
  shareableMessage: string,
  isOpen: boolean
}

export default function ResultDialog({ messageTitle, message, shareableMessage, isOpen }: IResultDialog) {
  const shareData = {
    title: "Hey! Respondi um desafio da Exam Challenge.",
    text: shareableMessage,
    url: "https://exam-challenge.vercel.app/",
  };


  const handleShare = async () => {
    await navigator.share(shareData);
  };

  const handleOpenChange = (openState: boolean) => {
    if (!openState) {
      redirect('/')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{messageTitle}</DialogTitle>
          <DialogDescription>
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mt-4">
          <Button onClick={handleShare} variant="outline" className="w-full flex gap-2">
            <Share className="h-4" /> Compartilhe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
