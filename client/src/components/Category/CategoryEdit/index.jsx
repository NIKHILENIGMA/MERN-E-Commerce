import PropTypes from "prop-types";

// import Components
import { Button, InputField, SelectOptions, TextareaField } from "@/components";

// Import Hooks
import { useEditCategory } from "@/hooks/CategoryHooks/useEditCategory";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaRegEdit } from "@/utils/Icons/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function EditCategory({ category }) {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { formData, isLoading, handleChange, handleSubmit } = useEditCategory(category);

  // This function is used to open and close the sheet component
  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      navigate(`/admin/products/categories/edit/${category._id}`);
    } else {
      navigate(`/admin/products/categories`);
      setIsOpen(isOpen);
    }
  };

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger>
        <FaRegEdit size={20} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-pretty">
            Edit Category
          </SheetTitle>
        </SheetHeader>
        <InputField
          label="Name"
          name="name"
          id="category-name"
          type="text"
          placeholder="Category Name"
          value={formData.name || ""}
          onChange={handleChange}
          className="outline-none "
        />

        <TextareaField
          label="Description"
          name="description"
          id="category-description"
          type="textarea"
          placeholder="Category Description"
          value={formData.description || ""}
          onChange={handleChange}
          className="outline-none "
        />

        <SelectOptions
          title="Select Status"
          name="status"
          options={["Active", "Inactive", "Scheduled"]}
          value={formData.status}
          onValueChange={handleChange}
          className="mt-5"
        />
        <SheetFooter className="flex mt-5">
          <SheetClose asChild>
            <Button
              type="submit"
              className="px-4 py-2 mt-1"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Edit Category"}
              
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

EditCategory.propTypes = {
  category: PropTypes.object,
};

export default EditCategory;
