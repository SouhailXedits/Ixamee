import { useId } from "react-id-generator"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialogRoot = AlertDialog
const AlertDialogTriggerButton = AlertDialogTrigger
const AlertDialogPortalElement = AlertDialogPortal
const AlertDialogOverlayElement = AlertDialogOverlay
const AlertDialogContentElement = AlertDialogContent
const AlertDialogHeaderElement = AlertDialogHeader
const AlertDialogTitleElement = AlertDialogTitle
const AlertDialogDescriptionElement = AlertDialogDescription
const AlertDialogFooterElement = AlertDialogFooter
const AlertDialogActionElement = AlertDialogAction
const AlertDialogCancelElement = AlertDialogCancel

const AlertDialogOverlay = forwardRef<
  React.ElementRef<typeof AlertDialogOverlayElement>,
  React.ComponentPropsWithoutRef<typeof AlertDialogOverlayElement>
>(({ className, ...props }, ref) => (
  <AlertDialogOverlayElement
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))

const AlertDialogContent = forwardRef<
  React.ElementRef<typeof AlertDialogContentElement>,
  React.ComponentPropsWithoutRef<typeof AlertDialogContentElement> & {
    id?: string
  }
>(({ className, id: idProp, ...props }, ref) => {
  const id = useId(idProp)
  return (
    <AlertDialogPortalElement>
      <AlertDialogOverlayElement />
      <AlertDialogContentElement
        id={id}
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortalElement>
  )
})

export {
  AlertDialogRoot,
  AlertDialogTriggerButton,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeaderElement,
  AlertDialogTitleElement,
  AlertDialogDescriptionElement,
  AlertDialogFooterElement,
  AlertDialogActionElement,
  AlertDialogCancelElement,
}
