import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import {
  CellProps,
  Column,
  useTable,
  useGlobalFilter,
  Row,
  IdType,
} from "react-table";
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

const NoImportBody = styled.div`
  position: fixed;
  top: 50%;
  left: 40%;
  color: var(--textnormal);
  text-align: center;
`;

export default function Table({
  isFileUpload,
  filterValue,
}: {
  isFileUpload: boolean;
  filterValue: string;
}) {
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
        id: "player_name",
      },
      {
        Header: "Jersey Number",
        accessor: "jersey_number" as keyof IPlayer,
        id: "jersey_number",
      },
      {
        Header: "Starter",
        accessor: "starter" as keyof IPlayer,
        id: "starter",
      },
      {
        Header: "Position",
        accessor: "position" as keyof IPlayer,
        id: "position",
      },
      {
        Header: "Height",
        accessor: "height" as keyof IPlayer,
        id: "height",
      },
      {
        Header: "Weight",
        accessor: "weight" as keyof IPlayer,
        id: "weight",
      },
      {
        Header: "Nationality",
        accessor: "nationality" as keyof IPlayer,
        id: "nationality",
      },
      {
        Header: "Appearances",
        accessor: "appearances" as keyof IPlayer,
        id: "appearances",
      },
      {
        Header: "Minutes Played",
        accessor: "minutes_played" as keyof IPlayer,
        id: "minutes_played",
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
                  setOpen(false);
                }}
                onDelete={() => {
                  setOperation({ name: "delete", id: id + "" });
                  setOpen(false);
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

  const ourGlobalFilterFunction = useCallback(
    (rows: Row<IPlayer>[], ids: IdType<IPlayer>[], query: string) => {
      const lQuery = query.toLowerCase();
      return rows.filter((row) => {
        const {
          player_name = "",
          position = "",
          nationality = "",
        } = row.original;
        return player_name?.toLowerCase().includes(lQuery) ||
          position?.toLowerCase().includes(lQuery) ||
          nationality?.toLowerCase().includes(lQuery);
      });
    },
    []
  );

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow,
    setHiddenColumns,
    // @ts-ignore
    setGlobalFilter,
  } = useTable(
    {
      columns,
      // @ts-ignore
      data: players,
      // @ts-ignore
      globalFilter: ourGlobalFilterFunction,
    },
    useGlobalFilter
  );
  const [operation, setOperation] = useState<{
    name: "close" | "edit" | "delete";
    id: string;
  }>({ id: "", name: "close" });

  useEffect(() => {
    setHiddenColumns(
      !isFileUpload ? ["starter", "appearances", "minutes_played"] : []
    );
  }, [isFileUpload, setHiddenColumns]);

  useEffect(() => {
    setGlobalFilter(filterValue);
  }, [filterValue]);

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
      <EditPlayerModal
        id={operation.id}
        isOpen={operation.name === "edit"}
        onClose={() => {
          setOperation({ name: "close", id: "" });
        }}
      />
      <DeletePlayerModal
        id={operation.id}
        isOpen={operation.name === "delete"}
        onClose={() => {
          setOperation({ name: "close", id: "" });
        }}
      />
      {!isFileUpload ? (
        <NoImportBody>
          <span>You do not have any players on the roster</span>
          <br />
          <span style={{ color: "var(--primaryorange)" }}>Import Team</span>
        </NoImportBody>
      ) : (
        ""
      )}
    </>
  );
}
