import { Select } from "semantic-ui-react"
import { weekOptions } from '../../helpers/weekOptions';
import { startGetAllSales } from '../../actions/sales';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useEffect, useState } from 'react';
import { ISales } from '../../reducers/salesReducer';
import moment from 'moment';
import _ from "lodash";

export const HomeScreen = () => {

    const dispatch = useDispatch();
    const { sales } = useSelector((state:RootStateOrAny) => state.sal)
    const [salesState, setSalesState] = useState([]);

    useEffect(() => {
        dispatch(startGetAllSales());
    }, [dispatch]);

    const handleSelectWeekChange = (e: any, data:any) => {
        // console.log(data);
        const salesfilter = sales.filter(
            (sale: ISales) => {
                return moment(sale.createdAt).format('MM') === (data.value)
            }
        )
        setSalesState(salesfilter);
    }
    const calculateGainedTotal = () => {
        return _.sum(salesState.map((sale:ISales)=> sale.total_price))
    }

    return (
        <div>
            <Select
                onChange={handleSelectWeekChange}
                placeholder="Seleccione un mes"
                options={weekOptions}
            />
            <p> Importe del mes: S/
                {
                    calculateGainedTotal()
                }
            </p>
            {/* <h2>Aqui iran las graficas de ganancias por dia y mas cosas</h2> */}
            {/* <p>
                Insertar nuevo valor en el total que diga la gananccia total de los productos que se vendieron considerando el precio costo venta y cantidad
            </p> */}
            <p>
                Poner filtros por dia usando las ventas para calcular las ganancias y un select para seleccionar los dias 
                o un check box para seleccionar por dia semana mes o un pickdate
                Poner Detalles en producto y proveedores categorias.
                Buscar libreria para graficos.
                Reportes a excell
            </p>
        </div>
    )
}
