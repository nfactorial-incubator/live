import axios from 'axios';
import { useEffect,  useState } from 'react';

export const Table = () => {

    const [tableData, setTableData] = useState();
    
    useEffect(() => {
        axios.get('http://localhost:4000/', {
            headers: {
                "content-type": "application/json",
            }
        }).then(({data}) => {
            setTableData(data);
        })

    }, [])

    return <div>
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>commits</th>
                </tr>
            </thead>
            {tableData?.map((row) => {
                console.log(row)
                return <tr>
                    <td>{row.name}</td>
                    <td>{row.commits?.commitsCount}</td>
                </tr>
            })}
        </table>
    </div>
}