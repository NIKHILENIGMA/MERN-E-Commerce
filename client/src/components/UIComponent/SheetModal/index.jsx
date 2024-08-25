import PropTypes from "prop-types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

import { Button } from "../../ui/button";


function SheetModal({ children, triggerText, title, handleSubmit, loading }) {
  return (
    <Sheet>
      <SheetTrigger>{triggerText}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-pretty">
            {title}
          </SheetTitle>
        </SheetHeader>
        {children}
        <SheetFooter className="flex mt-5">
          <SheetClose asChild>
            <Button
              type="submit"
              className="px-4 py-2 mt-1"
              onClick={handleSubmit}
              disabled={loading}
            >
              Add Category
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

SheetModal.propTypes = {
  triggerText: PropTypes.string,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  children: PropTypes.node,
  handleSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

export default SheetModal;
