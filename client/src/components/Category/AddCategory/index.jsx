// Import Components
import {
  InputField,
  SheetModal,
  SelectOptions,
  TextareaField,
} from "@/components";

// Import Hooks
import { useAddCategory } from "@/hooks/CategoryHooks/useAddCategory";


function AddCategoryModel() {
  // Initial Form Values
  const initialFormValues = {
    name: "",
    description: "",
    status: "",
  };

  const {
    formValues,
    handleChange,
    handleFileChange,
    handleSubmit,
    isLoading,
  } = useAddCategory(initialFormValues);

  return (
    <div>
      <SheetModal
        triggerText="Add Category"
        title="Create Category"
        buttonText="Add"
        type="submit"
        loading={isLoading}
        handleSubmit={handleSubmit}
      >
        <InputField
          label="Name"
          name="name"
          id="category-name"
          type="text"
          placeholder="Category Name"
          value={formValues.name || ""}
          onChange={handleChange}
          className="outline-none "
        />

        <TextareaField
          label="Description"
          name="description"
          id="category-description"
          type="textarea"
          placeholder="Category Description"
          value={formValues.description || ""}
          onChange={handleChange}
          className="outline-none "
        />

        <InputField
          label="Upload Image"
          name="image"
          id="category-image"
          type="file"
          value={formValues.image}
          onChange={handleFileChange}
          
        />
        
        <SelectOptions
          title="Select Status"
          name="status"
          options={["Active", "Inactive", "Scheduled"]}
          value={formValues.status}
          onValueChange={handleChange}
          className="mt-5"
        />

      </SheetModal>
    </div>
  );
}

export default AddCategoryModel;
