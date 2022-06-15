import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import axios from "axios";

const headers = [
  {
    key: "commitsCount",
    label: "commits",
    sortable: true,
  },
  {
    key: "time",
    label: "time",
    sortable: false,
  },
  {
    key: "languages",
    label: "languages",
    sortable: false,
  },
];
export const DashboardGrid = () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState({
    direction: "asc",
  });

  React.useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8080/api/dashboard")
      .then((resp) => {
        setRows(
          resp.data.map((item) => ({
            reponame: item.name,
            languages: item.activity?.languages,
            commitsCount: item.commits?.commitsCount,
            time: item.activity?.time?.digital,
          }))
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSortClick = (key) => {
    const isAsc = sortConfig.direction === "asc";
    setRows((prevRows) => {
      const sorted = prevRows.sort((a, b) => {
        if (a[key] > b[key]) return isAsc ? 1 : -1;
        else if (a[key] < b[key]) return isAsc ? -1 : 1;
        else return 0;
      });
      console.log(sorted);
      return sorted;
    });
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>Собираем данные...</div>
        <CircularProgress style={{ marginTop: 24 }} />
      </Box>
    );
  }
  return (
    <TableContainer component={Paper} loading={true}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" loading={true}>
        <TableHead>
          <TableRow>
            <TableCell>Repository</TableCell>
            {headers.map((header) => {
              return (
                <TableCell align="right">
                  {header.sortable ? (
                    <TableSortLabel
                      direction={sortConfig.direction}
                      onClick={() => {
                        onSortClick(header.key);
                      }}
                    >
                      {header.label}
                    </TableSortLabel>
                  ) : (
                    header.label
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.repoName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.reponame}
              </TableCell>
              <TableCell align="right">{row.commitsCount}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">
                {row.languages?.map((lang) => {
                  return <Chip label={lang} />;
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
