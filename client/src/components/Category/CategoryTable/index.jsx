// Import UI Components
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Import Hooks
import { useFetchCategories } from "@/hooks/CategoryHooks/useFetchCategories";
import { useDeleteCategory } from "@/hooks/CategoryHooks/useDeleteCategory";

// Import Constants
import { column } from "@/constants/tableColumn";

// Import Components
import { Img } from "@/components";
import EditCategory from "../CategoryEdit";

// Import Icons
import { FaRegTrashCan } from "@/utils/Icons/icons";
import { useState } from "react";

/**
 * @description CategoryTable component is used to display the list of categories
 *
 */

function CategoryTable() {
  // Fetch categories from the server
  const { category, isLoading } = useFetchCategories();
  const { handleDelation } = useDeleteCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEdit = (category) => setSelectedCategory(category);
  

  return (
    <div>
      {
        // Show loading spinner while fetching data
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input type="checkbox" />
                </TableHead>
                {column.map((item, index) => (
                  <TableHead key={index}>{item.Header}</TableHead>
                ))}
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {category?.map((item, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  {column.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.accessor === "name" ? (
                        <div className="flex items-center justify-start gap-2">
                          <Img
                            source={item.image}
                            alt={item.name}
                            className="object-contain w-8 h-8"
                          />
                          <div>
                            <h2 className="font-bold text-md">{item.name}</h2>
                            <p className="text-sm font-thin">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        item[column.accessor]
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="flex gap-2">
                    <div onClick={() => handleEdit(item)} className="bg-transparent hover:border-green-500 hover:text-green-500 ">
                      <EditCategory category={selectedCategory} />
                    </div>
                    <Button>
                      <FaRegTrashCan
                        size={18}
                        onClick={() => handleDelation(item._id)}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        )
      }
    </div>
  );
}

export default CategoryTable;
