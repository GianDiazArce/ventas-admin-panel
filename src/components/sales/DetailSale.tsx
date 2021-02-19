import React from 'react'
import { Button, Table } from 'semantic-ui-react';
import { useHistory, useLocation } from 'react-router-dom';
import { ISales, IDetailSales } from '../../reducers/salesReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { startGetDetailsSalesById } from '../../actions/sales';

interface IDetailSaleProps{
    sale: ISales
}

export const DetailSale = () => {

    let history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation();
    const sale = (location.state as IDetailSaleProps).sale;
    const { detailsSales } = useSelector((state:RootStateOrAny) => state.sal);
    
    useEffect(() => {
        
        dispatch(startGetDetailsSalesById(sale._id));

    }, [dispatch, sale._id])
    return (
        <div>
            <Button onClick={()=>{history.goBack()}}>Volver</Button>
            <br/>
            <br/>
            <br/>
            <label>Lugar de envio:</label>
            <input type="text" readOnly value={sale.place}/>
            <label>Precio Total:</label>
            <input type="text" readOnly value={sale.total_price}/>
            <label>Descuento:</label>
            <input type="text" readOnly value={sale.discount}/>
            <label>Estado:</label>
            <input type="text" readOnly value={sale.status}/>
            <label>Usuario:</label>
            <input type="text" readOnly value={sale.user.name}/>
            
            <br/>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre del producto</Table.HeaderCell>
                        <Table.HeaderCell>Cantidad de productos</Table.HeaderCell>
                        <Table.HeaderCell>Precio Costo</Table.HeaderCell>
                        <Table.HeaderCell>Precio venta</Table.HeaderCell>
                        <Table.HeaderCell>Total(venta)</Table.HeaderCell>
                        <Table.HeaderCell>Ganancia</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        detailsSales.map( (detail:IDetailSales) =>(
                            <Table.Row key={detail._id}>
                                <Table.Cell>{detail.product.name}</Table.Cell>
                                <Table.Cell>{detail.quantity}</Table.Cell>
                                <Table.Cell>S/{detail.product.price_cost.toFixed(2)}</Table.Cell>
                                <Table.Cell>S/{detail.price_sale.toFixed(2)}</Table.Cell>
                                <Table.Cell>S/{(detail.price_sale * detail.quantity).toFixed(2)}</Table.Cell>
                                <Table.Cell 
                                    negative={ ((detail.price_sale * detail.quantity) - (detail.product.price_cost * detail.quantity))<0 ? true : false }
                                    positive={ ((detail.price_sale * detail.quantity) - (detail.product.price_cost * detail.quantity))>0 ? true : false }
                                >
                                        S/{((detail.price_sale * detail.quantity) - (detail.product.price_cost * detail.quantity)).toFixed(2)}
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
                {/* <Table.Footer>
                    <Table.Row >
                        <Table.Cell 
                            
                            textAlign="right"
                            colSpan="5"
                        >
                            Descuento:  <b>{sale.discount}%</b>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row positive>
                        <Table.Cell 
                            // positive
                            textAlign="right"
                            colSpan="5"
                        >
                            Precio Total (IGV INCLUIDO):  <b>{sale.total_price}</b>
                        </Table.Cell>
                    </Table.Row>
                </Table.Footer> */}
            </Table>

        </div>
    )
}
