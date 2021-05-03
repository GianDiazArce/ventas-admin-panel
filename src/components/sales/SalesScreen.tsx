import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
    Table,
    Button,
    Modal,
    ModalActions,
    Form,
    Grid,
    Dropdown,
    TableFooter,
    Popup,
    Header,
    Icon,
    Select,
    Pagination,
} from "semantic-ui-react";
import {
    startGetAllSales,
    deleteItemShopCart,
    startAddItemShopCart,
    startChangeValuesShopCart,
    startNewSale,
} from "../../actions/sales";
import { ISales } from "../../reducers/salesReducer";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { btnAddIcon } from "../ui/buttons/btnAddIcon";
import { startGetProducts } from "../../actions/products";
import { IProduct } from "../../reducers/productReducer";

import * as AiIcons from "react-icons/ai";

import _ from "lodash";
import { startDeleteSaleAndDetails } from '../../actions/sales';
import { weekOptions } from '../../helpers/weekOptions';
import { translateStatusSale } from '../../helpers/translateStatusSale';

/* 
    Observaciones:
        - Pattern en inputs shop cart
        - Validaciones y useeffect en cambio de cantidad (useEffect separado)
        - Crear una pantalla de carga dimmed mientras se envia la venta
*/

export const SalesScreen = () => {
    const dispatch = useDispatch();
    const { sales, shopCart } = useSelector(
        (state: RootStateOrAny) => state.sal
    );
    const { products } = useSelector((state: RootStateOrAny) => state.prod);
    const { uid } = useSelector((state: RootStateOrAny) => state.auth);
    const [saleId, setSaleId] = useState('');
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [lugarEnvio, setLugarEnvio] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [cboProductValue, setCboProductValue] = useState({});
    const [cboMonthValue, setCboMonthValue] = useState(moment().format('MM') );
    const [salesFilterByMonth, setSalesFilterByMonth] = useState<ISales[]>();

    //Test
    const [salesPerPage, ] = useState(5);
    // const [totalPages, currentSales, handlePageChange, currentPage] = PaginationCalculate(salesFilterByMonth, salesPerPage);
    const [currentPage, setCurrentPage] = useState(1)
    // const [lastPage, ] = useState(Math.round(salesFilterByMonth?.length || 0 / salesPerPage));

    let history = useHistory();

    useEffect(() => {
        dispatch(startGetAllSales());
        
    }, [dispatch]);
    useEffect(() => {
        if(openModal){
            dispatch(startGetProducts());
        }
    }, [openModal, dispatch])

    useEffect(() => {
        const salesFilter = sales.filter(
            (sale: ISales) => {
                return moment(sale.createdAt).format('MM') === (cboMonthValue)
            }
        )
        setSalesFilterByMonth(salesFilter)
    }, [cboMonthValue, sales])

    const handleDetailSale = (sale: ISales) => {
        history.push({
            pathname: `/sales/${sale._id}`,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const totalPriceShopCart = _.sum(
            _.map(shopCart, (p) => p.total_price)
        ).toFixed(2);
        dispatch(startNewSale(shopCart, totalPriceShopCart, uid, lugarEnvio));
        setOpenModal(false);
    };
    const handleProductChange = (
        e: React.FormEvent<HTMLInputElement>,
        data: any
    ) => {
        // console.log(e)
        // console.log(data.value)
        let producto = products.filter(
            (product: IProduct) => product._id === data.value
        );
        setCboProductValue(producto[0]);
        // console.log(producto[0])
    };

    const btnAddItem = () => {
        dispatch(startAddItemShopCart(cboProductValue));
    };
    const handleRemoveItemShopCart = (id: string) => {
        dispatch(deleteItemShopCart(id));
    };
    const handleQuantityChange = (e: any, id: string) => {
        let value = e.target.value;
        dispatch(startChangeValuesShopCart(value, id, "quantity"));
    };
    const handlePriceSaleChange = (e: any, id: string) => {
        let value = e.target.value;
        dispatch(startChangeValuesShopCart(value, id, "price_sale"));
    };
    const getTotalPriceShopCart = () => {
        const totalPriceShopCart = _.sum(_.map(shopCart, (p) => p.total_price));

        return totalPriceShopCart.toFixed(2); // Alfinal enviar el total como parametro usando el _sum _map
    };
    const handleDeleteSaleAndDetails = (id: string) => {
        setOpenDeleteModal(true);
        setSaleId(id);
        // setOpenDeleteModal(false);
    };
    const deleteDetailsAndSale = () => {
        dispatch(startDeleteSaleAndDetails(saleId));
        setOpenDeleteModal(false);
    }
    const borrar = (e: any, data:any) => {
        // console.log(data);
        // const salesfilter = sales.filter(
        //     (sale: ISales) => {
        //         return moment(sale.createdAt).format('MM') === (data.value)
        //     }
        // )
        // console.log(salesfilter)
        // setSalesFilterByMonth(salesfilter)
        setCboMonthValue(data.value);
    }
    const handlePageChange = (e: any, data: any) => {
        setCurrentPage(data.activePage);
    }

    const indexOfLastPage = currentPage * salesPerPage;
    const indexOfFirstPage = indexOfLastPage - salesPerPage;
    const currentSales:any = salesFilterByMonth?.slice(indexOfFirstPage, indexOfLastPage);
    const total = salesFilterByMonth?.length === undefined ? 0 : salesFilterByMonth?.length / salesPerPage;
    const totalPages = Math.ceil(total);

    return (
        <div>
            <h2>Sales Screen</h2>
            
            <Modal
                as={Form}
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                closeOnDimmerClick={false}
                closeIcon
                open={openModal}
                trigger={btnAddIcon("Crear Venta")}
                onSubmit={(e: React.FormEvent<HTMLInputElement>) => {
                    // isEdit ? handleUpdateSubmit(e) : handleSubmit(e);
                    handleSubmit(e);
                }}
            >
                <Modal.Header>Generar una venta</Modal.Header>
                <Modal.Content>
                    <Grid columns={2}>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <label>Producto:</label>
                                <Dropdown
                                    fluid
                                    search
                                    selection
                                    onChange={(e: any, data: any) =>
                                        handleProductChange(e, data)
                                    }
                                    options={products.map(
                                        (product: IProduct) => {
                                            return {
                                                key: product._id,
                                                text: `${product.name} - stock(${product.stock})`,
                                                value: product._id,
                                            };
                                        }
                                    )}
                                />
                            </Grid.Column>
                            <Grid.Column className="btnAddItem">
                                <Button
                                    color="instagram"
                                    type="button"
                                    onClick={() => {
                                        btnAddItem();
                                    }}
                                >
                                    Agregar
                                </Button>
                            </Grid.Column>
                            <span>
                                *Click al nombre del producto para mas info
                            </span>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Table>
                                    {/* <Table color="teal" inverted > */}
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell width="1"></Table.HeaderCell>
                                            <Table.HeaderCell width="8">
                                                Nombre
                                            </Table.HeaderCell>
                                            <Table.HeaderCell width="2">
                                                Cantidad
                                            </Table.HeaderCell>
                                            <Table.HeaderCell width="2">
                                                Precio de venta
                                            </Table.HeaderCell>
                                            <Table.HeaderCell width="3">
                                                Total
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {shopCart.map((product: any) => (
                                            <Table.Row key={product._id + "00"}>
                                                <Table.Cell>
                                                    <AiIcons.AiOutlineCloseCircle
                                                        size="1.5em"
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            handleRemoveItemShopCart(
                                                                product._id
                                                            );
                                                        }}
                                                    />
                                                </Table.Cell>
                                                {/* <Table.Cell>{product.name} || p. cost {product.price_cost}</Table.Cell> */}
                                                <Popup
                                                    content={`
                                                                Precio Costo: S/${product.price_cost.toFixed(
                                                                    2
                                                                )},\n
                                                                Stock: ${
                                                                    product.stock
                                                                }
                                                            `}
                                                    on="click"
                                                    // key={user.name}
                                                    header={
                                                        "Detalle de " +
                                                        product.name
                                                    }
                                                    trigger={
                                                        <Table.Cell className="cursor-pointer">
                                                            {product.name}
                                                        </Table.Cell>
                                                    }
                                                />

                                                <Table.Cell>
                                                    <input
                                                        type="number"
                                                        name="quantityPreSale"
                                                        min="0"
                                                        max={product.stock}
                                                        onChange={(e: any) => {
                                                            handleQuantityChange(
                                                                e,
                                                                product._id
                                                            );
                                                        }}
                                                        value={product.quantity}
                                                    />
                                                </Table.Cell>
                                                <Table.Cell
                                                    negative={
                                                        product.price_sale <
                                                        product.price_cost
                                                    }
                                                    positive={
                                                        product.price_sale >
                                                        product.price_cost
                                                    }
                                                >
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        name="priceSalePreSale"
                                                        step="0.01"
                                                        onChange={(e: any) => {
                                                            handlePriceSaleChange(
                                                                e,
                                                                product._id
                                                            );
                                                        }}
                                                        value={
                                                            product.price_sale
                                                        }
                                                    />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {
                                                        "S/" +
                                                            product.total_price.toFixed(
                                                                2
                                                            )
                                                        // isNaN(parseFloat(product.price_sale) * parseInt(product.quantity)) ? 0 : 'S/'+(parseFloat(product.price_sale) * parseFloat(product.quantity)).toFixed(2)
                                                    }
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                    <TableFooter>
                                        <Table.Row>
                                            <Table.HeaderCell
                                                colSpan="4"
                                                textAlign="right"
                                            >
                                                Total:
                                            </Table.HeaderCell>
                                            <Table.HeaderCell colSpan="1">
                                                {"S/" + getTotalPriceShopCart()}
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </TableFooter>
                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={5}>
                                <label>Destino o Lugar de compra</label>
                                <input
                                    onChange={(e: any) => {
                                        setLugarEnvio(e.target.value);
                                    }}
                                    value={lugarEnvio}
                                    type="text"
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <ModalActions>
                    {/* <Button type="reset" negative onClick={()=>{ dispatch(salesClearShopCart()) }} >Limpiar</Button> */}
                    <Button
                        color="green"
                        disabled={shopCart.some(
                            (p: any) => p.total_price === 0
                        )}
                        onClick={() => {}}
                        type="submit"
                    >
                        Crear
                    </Button>
                </ModalActions>
            </Modal>
            
            <div><br/>
                {/* {
                    // moment().format('MM')
                } */}
                <Select
                    onChange={borrar}
                    placeholder="Seleccione un mes"
                    options={weekOptions}
                    value={cboMonthValue}
                />
            </div>


            <Modal
                basic
                onClose={() => setOpenDeleteModal(false)}
                onOpen={() => setOpenDeleteModal(true)}
                open={openDeleteModal}
                size="small"
                // trigger={<Button type="button" negative >Borrar</Button>}
            >
                <Header icon>
                    <Icon name="archive" />
                    ¿Seguro de eliminar la venta?
                </Header>
                <Modal.Content>
                    {/* onClick={()=>{handleDeleteSaleAndDetails(sale._id)}} */}
                    <p>
                        Esto eliminará la venta y su detalles. Pulse en Eliminar
                        para borrar la venta, No para volver
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        basic
                        color="red"
                        inverted
                        onClick={() => setOpenDeleteModal(false)}
                    >
                        <Icon name="remove" /> No
                    </Button>
                    <Button color="green" inverted onClick={() => {deleteDetailsAndSale()}}>
                        <Icon name="checkmark" /> Eliminar
                    </Button>
                </Modal.Actions>
            </Modal>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Fecha de la venta</Table.HeaderCell>
                        <Table.HeaderCell>Precio total</Table.HeaderCell>
                        <Table.HeaderCell>Lugar de envio</Table.HeaderCell>
                        <Table.HeaderCell>Usuario</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Acciones</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {

                    salesFilterByMonth === undefined || salesFilterByMonth.length === 0 ? <Table.Row><Table.Cell colSpan={6}>No hay productos</Table.Cell></Table.Row> :
                    currentSales.map((sale: ISales) => (
                        <Table.Row key={sale._id}>
                            <Table.Cell>
                                {moment(sale.createdAt).format("DD/MM/YYYY")} : {moment(sale.createdAt).format('hh:mm a')}
                            </Table.Cell>
                            <Table.Cell>S/{sale.total_price.toFixed(2)}</Table.Cell>
                            <Table.Cell>{sale.place}</Table.Cell>
                            <Table.Cell>{sale.user.name}</Table.Cell>
                            <Table.Cell 
                                positive={sale.status === 'success' ? true : false} 
                                warning={sale.status === 'pending' ? true : false}
                                negative={sale.status === 'cancel' ? true : false}
                            >
                                {translateStatusSale(sale.status)}
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    type="button"
                                    primary
                                    onClick={() => handleDetailSale(sale)}
                                >
                                    Ver detalles
                                </Button>

                                {
                                    sale.status === 'cancel' ? 
                                    (
                                        <Button
                                            type="button"
                                            negative
                                            onClick={() => {
                                                handleDeleteSaleAndDetails(sale._id,);
                                            }}
                                        >
                                            Borrar
                                        </Button>
                                    )
                                    :
                                    null
                                }
                            </Table.Cell>
                        </Table.Row>
                    ))
                    }
                </Table.Body>
                <Table.Footer  >
                    <Table.Row  >
                        <Table.HeaderCell textAlign="center" colSpan="6" >
                            <Pagination
                                activePage={currentPage}
                                onPageChange={handlePageChange}
                                totalPages={totalPages}
                            />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    );
};
