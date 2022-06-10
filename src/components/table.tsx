import React, { useState } from "react";
import styled from "styled-components";

import { CellProps, Column, useTable } from "react-table";
import { useAppSelector } from "../app/hooks";
import { IPlayer, selectPlayers } from "../app/store/footballManagerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionModal from "./modals/action-modal";
import EditPlayerModal from "./modals/edit-player-modal";
import DeletePlayerModal from "./modals/delete-player-modal";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--neutralbackground-2);
  border-radius: 8px;
  border: 1px solid var(--neutralbackground-2);
  height: 40rem;
  color: var(--textnormal);
  margin-bottom: 40px;
  overflow: scroll;
  padding: 10px 20px;
  & table {
    border-collapse: separate;
    border-spacing: 4px 10px;
  }
`;

export default function Table() {
  // @ts-ignore
  const columns: Column<IPlayer>[] = React.useMemo(
    () => [
      {
        Header: "Player Name",
        Cell: ({ row }: CellProps<IPlayer>) => {
          const { flag_image = "", player_name } = row.original;
          return (
            <span style={{ display: "flex", alignItems: "center" }}>
              <img
                src={flag_image + ""}
                alt=""
                style={{ height: 24, width: 24 }}
              />
              <span style={{ marginLeft: 8 }}>{player_name}</span>
            </span>
          );
        },
      },
      {
        Header: "Jersey Number",
        accessor: "jersey_number" as keyof IPlayer,
      },
      {
        Header: "Starter",
        accessor: "starter" as keyof IPlayer,
      },
      {
        Header: "Position",
        accessor: "position" as keyof IPlayer,
      },
      {
        Header: "Height",
        accessor: "height" as keyof IPlayer,
      },
      {
        Header: "Weight",
        accessor: "weight" as keyof IPlayer,
      },
      {
        Header: "Nationality",
        accessor: "nationality" as keyof IPlayer,
      },
      {
        Header: "Appearance",
        accessor: "appearance" as keyof IPlayer,
      },
      {
        Header: "Minutes Played",
        accessor: "minutes_played" as keyof IPlayer,
      },
      {
        Header: "",
        Cell: ({ row }: CellProps<IPlayer>) => {
          const [isOpen, setOpen] = useState(false);
          const { id } = row.original;
          return (
            <div style={{ position: "relative" }}>
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
                icon={["fas", "ellipsis"]}
              />
              <ActionModal
                isOpen={isOpen}
                onClose={() => setOpen(false)}
                onEdit={() => {
                  setOperation({ name: "edit", id: id + "" });
                  // setOpen(false);
                }}
                onDelete={() => {
                  setOperation({ name: "delete", id: id + "" });
                  // setOpen(false);
                }}
              />
            </div>
          );
        },
        width: "30",
        id: "action",
      },
    ],
    []
  );

  const players = useAppSelector(selectPlayers);

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow,
  } = useTable({
    columns,
    // @ts-ignore
    data: players,
  });
  const [operation, setOperation] = useState<{
    name: "close" | "edit" | "delete";
    id: string;
  }>({ id: "", name: "close" });

  return (
    <>
      <TableContainer>
        <table style={{ width: "100%" }} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr
                style={{ textAlign: "left" }}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column: any) => (
                  <th style={column?.style || {}} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any, index: number) => {
              prepareRow(row);
              return (
                <React.Fragment key={index}>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
      <EditPlayerModal isOpen={operation.name === "edit"} />
      <DeletePlayerModal isOpen={operation.name === "delete"} />
    </>
  );
}
