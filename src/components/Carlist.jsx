import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    const [columnDefs] = useState([
        { field: "brand", sortable: true, filter: true },
        { field: "model", sortable: true, filter: true },
        { field: "color", sortable: true, filter: true },
        { field: "fuel", sortable: true, filter: true, width: 100 },
        { field: "year", sortable: true, filter: true, width: 100 },
        { field: "price", sortable: true, filter: true,  width: 120 },
        {
            cellRenderer: params => <EditCar cardata={params.data}  fetchCars={fetchCars}/>,
            width:120
        },
        {
            cellRenderer: params => <Button size="small" onClick={() => deleteCar(params.data._links.car.href)}>Delete</Button>,
            width: 200
        }
    ]);

    useEffect(() => {
        fetchCars();
    }, 
    []);
    
    const deleteCar = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: "DELETE" })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error in delete " + response.statusText);
                    }
                    else {
                        setOpen(true)

                        fetchCars();
                    }
                })

                .catch(err => console.error(err))
        }
    }

    const fetchCars = () => {
        fetch(import.meta.env.VITE_API_URL + '/cars')
            .then(response => {
                if (!response.ok)
                    throw new Error("Something went wrong" + response.statusText);
                return response.json()
            })
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err))
    }


    return (

        <>
        <AddCar fetchCars={fetchCars} />
            <div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}

                />

            </div >
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Car Deleted succesfully"
            />
        </>
    );
}
export default Carlist;