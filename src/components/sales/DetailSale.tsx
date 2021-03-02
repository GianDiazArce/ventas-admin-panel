import React from 'react'
import { Button, Grid, Input, Table, Icon, List, Label, Popup, Header, Modal } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router-dom';
import { IDetailSales } from '../../reducers/salesReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { startGetActiveSale, startGetDetailsSalesById, startSaleChangeStatus, returnStockProduct } from '../../actions/sales';
import { translateStatusSale } from '../../helpers/translateStatusSale';

// interface IDetailSaleProps{
//     sale: ISales
// }

export const DetailSale = () => {

    let history = useHistory()
    const dispatch = useDispatch();
    const { detailsSales, activeSale } = useSelector((state:RootStateOrAny) => state.sal);
    const [open, setOpen] = useState(false);
    let { id:saleIdActive }:any = useParams();
    
    useEffect(() => {
        
        dispatch(startGetActiveSale(saleIdActive))
        dispatch(startGetDetailsSalesById(saleIdActive));
    }, [dispatch, saleIdActive])

    const handleSaleStatusChange = (status: string, saleId: string) => {

        if (status === 'cancel'){
            setOpen(true);
        } else if (status === 'pending'){
            dispatch( startSaleChangeStatus(status, saleId) )
        } else if (status === 'success'){
            dispatch( startSaleChangeStatus(status, saleId) )
        } else {
            console.log('Error')
        }
    }
    const handleCancelSale = (status: string, saleId: string, details: IDetailSales[]) => {
        dispatch(returnStockProduct(details))
        dispatch( startSaleChangeStatus(status, saleId) );
        setOpen(false);
    }

    return (
        <div>
            <br/>
            <Button icon onClick={()=>{history.goBack()}}><Icon name="arrow left" />  Volver</Button>
            <br/>
            <br/>
            <Label basic color="blue" >Explicacion de estado de pedido:</Label>
            <List divided selection >
                <List.Item>
                    <Label color="red" horizontal>Cancelado</Label>
                    Pedido cancelado
                </List.Item>
                <List.Item>
                    <Label color="yellow" horizontal>Pendiente</Label>
                    El pedido se encuentra reservado, pero aun no se verifica el pago o no fue enviado.
                </List.Item>
                <List.Item>
                    <Label color="green" horizontal>Completado</Label>
                    El pedido fue enviado y el pago fue verificado correctamente
                </List.Item>
            </List>
            <br/>

            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                // trigger={<Button>Basic Modal</Button>}
            >
                <Header icon>
                    <Icon name='archive' />
                    ¿Seguro de cancelar la venta?
                </Header>
                <Modal.Content>
                    <p>
                    Al cancelar la venta se devolvera el stock y ya no podrá cambiar el estado del producto nuevamente.
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpen(false)}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={() => {
                        handleCancelSale('cancel', activeSale._id, detailsSales);
                    }}>
                        <Icon name='checkmark' /> Eliminar
                    </Button>
                </Modal.Actions>
            </Modal>


            <hr/><br/><br/>
            {
                !activeSale ? '' :
                <Grid columns="2" divided padded="horizontally">
                <Grid.Row>
                    <Grid.Column width={7}>
                        <label>Lugar de envio: </label>
                        <Input type="text" readOnly value={activeSale.place}/>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <label>Precio Total: </label>
                        <Input type="text" readOnly value={'S/'+activeSale.total_price.toFixed(2)}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column  width={7}>
                        <label>Estado: </label>
                        <Input type="text" className="mr-3"  readOnly value={translateStatusSale(activeSale.status)}/> 

                        
                        {
                            activeSale.status === 'success' || activeSale.status === 'cancel' ? null : 
                            <Popup 
                                content="Pedido Completado"
                                trigger={
                                    <Button onClick={()=>{handleSaleStatusChange('success', activeSale._id)}} color="green" icon compact >
                                        <Icon name="check"/>
                                    </Button> 
                                }
                            />
                        }
                        {
                            activeSale.status === 'cancel' ? null : 
                            <Popup 
                                content="Cancelar Pedido"
                                trigger={
                                    <Button onClick={()=>{handleSaleStatusChange('cancel', activeSale._id)}} icon color="red" compact >
                                        <Icon name="cancel"/>
                                    </Button>
                                }
                            />
                        }
                        {
                            activeSale.status === 'pending' || activeSale.status === 'cancel' ?
                            null
                            : 
                            <Popup 
                                content="Pedido pendiente"
                                trigger={
                                    <Button onClick={()=>{handleSaleStatusChange('pending', activeSale._id)}} icon color="yellow" compact >
                                        <Icon name="warning circle"/>
                                    </Button>
                                }
                            />
                        }
                    </Grid.Column>
                    <Grid.Column  width={7}>
                        <label>Usuario: </label>
                        <Input type="text" readOnly value={activeSale.user.name}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>}
            <br/>
            
{/*             
            <label>Descuento:</label>
            <input type="text" readOnly value={sale.discount}/> */}
            
            
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
                <Table.Footer>
                    {/* <Table.Row >
                        <Table.Cell 
                            
                            textAlign="right"
                            colSpan="5"
                        >
                            Descuento:  <b>{sale.discount}%</b>
                        </Table.Cell>
                    </Table.Row> */}
                    <Table.Row positive>
                        <Table.Cell 
                            // positive
                            textAlign="right"
                            colSpan="5"
                        >
                            {/* Precio Total (IGV INCLUIDO):  S/<b>{sale.total_price.toFixed(2)}</b> */}
                            {
                                !activeSale ? '' :
                                'Precio Total:  S/' + activeSale.total_price.toFixed(2)
                            }
                        </Table.Cell>
                    </Table.Row>
                </Table.Footer>
            </Table>

        </div>
    )
}
