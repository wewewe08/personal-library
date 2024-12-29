import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Button, Rating, Switch } from "@mui/material";

type BookData = {
  cover: string;
  description: string;
};

type Book = {
  title: string;
  author: string;
  rating: number;
  date_read: string;
  num_pages: number;
  currently_reading: boolean;
  subRows?: BookData[];
};

const data: Book[] = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 4.5,
    date_read: "2023-12-01",
    num_pages: 180,
    currently_reading: false,
  },
  {
    title: "1984",
    author: "George Orwell",
    rating: 5.0,
    date_read: "2023-11-15",
    num_pages: 328,
    currently_reading: false,
  },
];

const LibraryTable = () => {
  const table = useMaterialReactTable({
    columns: [
      {
        accessorKey: "title",
        header: "Book Title",
        enableSorting: true,
      },
      {
        accessorKey: "author",
        header: "Author",
        enableSorting: true,
      },
      {
        accessorKey: "rating",
        header: "Book Rating",
        enableSorting: true,
        Edit: ({ cell, row }) => {
          return <Rating name="half-rating" defaultValue={0} precision={0.5} />;
        },
        Cell: ({ row, cell }) => {
          return (
            <Rating
              name="half-rating"
              defaultValue={0}
              precision={0.5}
              readOnly
            />
          );
        },
      },
      {
        accessorKey: "date_read",
        header: "Date Read",
        enableSorting: true,
      },
      {
        accessorKey: "num_pages",
        header: "# of Pages",
        enableSorting: true,
      },
      {
        accessorKey: "currently_reading",
        header: "Currently Reading",
        enableSorting: true,
        Edit: ({ cell, row }) => {
          return (
            <Switch
              checked={row?.original?.currently_reading}
              onChange={(_, checked) => {
                console.log(checked);
              }}
              disabled={false}
            />
          );
        },
        Cell: ({ row, cell }) => {
          return (
            <Switch
              checked={row?.original?.currently_reading}
              disabled={true}
            />
          );
        },
      },
    ],
    data,
    enableColumnFilters: false,
    enableColumnFilterModes: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableExpanding: true,
    // getSubRows: (originalRow) => originalRow.subRows,
    onCreatingRowSave: async ({ values, table }) => {
      console.log(values);
      table.setCreatingRow(null);
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        + New Book
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default LibraryTable;
