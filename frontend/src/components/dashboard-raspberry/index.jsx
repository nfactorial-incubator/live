import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ReactComponent as RaspberrySVG } from "../../assets/raspberry.svg";
import { IconButton } from "@mui/material";
import { ReactComponent as DefaultLoader } from "../../assets/bean_eater.svg";
import { ErrorComponent } from "../error-component";

import {
  useGetAllOfUsQuery,
  useIncreaseCounterMutation,
} from "../../slices/getAllUsersSlice";

export const DashboardRaspberry = () => {
  const { data: users = [], isLoading, isError } = useGetAllOfUsQuery();
  const [increaseCounter, { isLoading: isIncreasedLoading }] =
    useIncreaseCounterMutation();

  if (isLoading || isIncreasedLoading) return <DefaultLoader />;

  if (isError) return <ErrorComponent />;

  if (users.length === 0)
    return <>Что-то пошло не так, и пользователей нет %(</>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ФИО</TableCell>
            <TableCell align="center">ментор/студент</TableCell>
            <TableCell align="center">Количество малин</TableCell>
            <TableCell align="center">Увеличить</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fullname}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {row.role}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {row.raspberries}
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => increaseCounter({ id: row._id })}>
                  <RaspberrySVG fill="#e01425" width={30} height={30} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
