import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
    startGetProducts,
    startNewProduct,
    startUpdateProduct,
    startDeleteProduct,
} from "../../actions/products";
import { useEffect, useState } from "react";
import {
    Modal,
    Table,
    Form,
    Grid,
    Button,
    Input,
    Select,
    // Search,
} from "semantic-ui-react";
import { IProduct } from "../../reducers/productReducer";
import { btnAddIcon } from "../ui/buttons/btnAddIcon";
import { startGetAllSuppliers } from "../../actions/supplier";
import { getAllCategories } from "../../actions/categories";
import { ICategory } from "../../reducers/categoriesReducer";
import { ISupplier } from "../../reducers/suppliersReducer";
import { useForm } from "../../hooks/useForm";
import { Header, Icon } from "semantic-ui-react";

const initProductState = {
    _id: "",
    productName: "",
    price_cost: "",
    stock: 0,
    category: "",
    supplier: "",
    total_price: 0,
};

export const ProductsScreen = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state: RootStateOrAny) => state.prod);
    const { categories } = useSelector((state: RootStateOrAny) => state.cat);
    const { suppliers } = useSelector((state: RootStateOrAny) => state.sup);

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [formValues, handleInputChange, reset, newFormValues] =
        useForm(initProductState);
    const { productName, total_price, stock, category, supplier }: any =
        formValues;
    const [precioCosto, setprecioCosto] = useState(0);

    useEffect(() => {
        dispatch(startGetProducts());
        dispatch(startGetAllSuppliers());
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        setprecioCosto(parseFloat(total_price) / parseFloat(stock));
    }, [total_price, stock]);

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        if (isEdit) {
            dispatch(startUpdateProduct(formValues, precioCosto));
            setOpenModal(false);
            reset();
        } else {
            dispatch(startNewProduct(formValues, precioCosto));
            setOpenModal(false);
            reset();
        }
    };

    const handleSelectCategoryChange = (e: any, data: any) => {
        newFormValues({
            ...formValues,
            category: data.value,
        });
    };

    const handleSelectSupplierChange = (e: any, data: any) => {
        newFormValues({
            ...formValues,
            supplier: data.value,
        });
    };

    const handlebtnEdit = (product: IProduct) => {
        setIsEdit(true);
        let price_total = product.price_cost * product.stock;

        newFormValues({
            _id: product._id,
            productName: product.name,
            stock: product.stock,
            category: product.category._id,
            supplier: product.supplier._id,
            total_price: price_total,
        });
        setOpenModal(true);
    };

    const handleDelete = (product: IProduct) => {
        newFormValues({
            _id: product._id,
            productName: product.name,
        });
        setOpenDeleteModel(true);
    };

    const deleteProduct = () => {
        dispatch(startDeleteProduct(formValues));
        setOpenDeleteModel(false);
        reset();
    };

    return (
        <div>
            <h2>Productos</h2>

            <Modal
                as={Form}
                onSubmit={(e: React.FormEvent<HTMLInputElement>) => {
                    // isEdit ? handleUpdateSubmit(e) : handleSubmit(e);
                    handleSubmit(e);
                }}
                trigger={btnAddIcon("Agregar nuevo Producto")}
                closeIcon
                closeOnEscape
                closeOnDimmerClick={false}
                onClose={() => {
                    setIsEdit(false);
                    setOpenModal(false);
                    reset();
                }}
                onOpen={() => {
                    setOpenModal(true);
                    reset();
                }}
                open={openModal}
            >
                <Modal.Header>
                    {isEdit ? "Editar producto" : "Nuevo producto"}
                </Modal.Header>
                <Modal.Content>
                    <Grid columns={2}>
                        <Grid.Row>
                            {/* Primera Columa */}
                            <Grid.Column>
                                {/* Agregar <Form.Group widths='equal'> para tener el mismo tamaño */}
                                <Form.Field>
                                    <label>Nombre del producto:</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={productName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Precio total:</label>
                                    <Input
                                        label="S/"
                                        type="text"
                                        name="total_price"
                                        value={total_price}
                                        onChange={handleInputChange}
                                    ></Input>
                                </Form.Field>

                                <Form.Field
                                    control={Select}
                                    label="Proveedor:"
                                    placeholder="Elija un Proveedor"
                                    value={supplier}
                                    onChange={(e: any, data: any) =>
                                        handleSelectSupplierChange(e, data)
                                    }
                                    options={suppliers.map(
                                        (supplier: ISupplier) => {
                                            return {
                                                key: supplier._id,
                                                text: supplier.name,
                                                value: supplier._id,
                                            };
                                        }
                                    )}
                                />
                            </Grid.Column>

                            {/* Segunda Columna */}
                            <Grid.Column>
                                <Form.Field>
                                    <label>Total de productos:</label>
                                    <Input
                                        placeholder="Stock"
                                        type="number"
                                        name="stock"
                                        value={stock}
                                        onChange={handleInputChange}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Precio costo:</label>
                                    <Input
                                        label="S/"
                                        name="price_cost"
                                        readOnly
                                        type="text"
                                        value={
                                            isNaN(precioCosto) || stock === 0
                                                ? 0
                                                : precioCosto.toFixed(2)
                                        }
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Select
                                        fluid
                                        label="Categoria:"
                                        className="selectSemantic"
                                        onChange={(e: any, data) =>
                                            handleSelectCategoryChange(e, data)
                                        }
                                        placeholder="Elija una categoria"
                                        value={category}
                                        options={categories.map(
                                            (category: ICategory) => {
                                                return {
                                                    key: category._id,
                                                    text: category.name,
                                                    value: category._id,
                                                };
                                            }
                                        )}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" onClick={() => {}} type="submit">
                        {isEdit ? "Guardar" : "Crear Producto"}
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                basic
                onClose={() => {
                    setOpenDeleteModel(false);
                    reset();
                }}
                onOpen={() => setOpenDeleteModel(true)}
                closeOnDimmerClick={false}
                open={openDeleteModel}
                size="small"
                // trigger={<Button>Basic Modal</Button>}
            >
                <Header icon>
                    <Icon name="archive" />
                    Eliminar Proveedor
                </Header>
                <Modal.Content>
                    <p>
                        ¿Está segur@ de eliminar el producto:{" "}
                        <b>{productName}</b>?<br />
                        Pulse en Eliminar para borrar el producto <br />
                        Recuerde: Si quiere recuperar el producto deberá crear
                        una nueva
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        basic
                        color="red"
                        inverted
                        onClick={() => {
                            setOpenDeleteModel(false);
                            reset();
                        }}
                    >
                        <Icon name="remove" /> No
                    </Button>
                    <Button
                        color="green"
                        inverted
                        onClick={() => {
                            deleteProduct();
                        }}
                    >
                        <Icon name="checkmark" /> Eliminar
                    </Button>
                </Modal.Actions>
            </Modal>
            {/* <Search 
                results={products}
            />     */}
            <Table sortable celled fixed className="table-width-auto">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>

                        <Table.HeaderCell>Stock</Table.HeaderCell>

                        <Table.HeaderCell>Precio Costo</Table.HeaderCell>

                        <Table.HeaderCell>Categoria</Table.HeaderCell>

                        <Table.HeaderCell>Proveedor</Table.HeaderCell>

                        <Table.HeaderCell width="8">Acciones</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {products.map((product: IProduct) => (
                        <Table.Row key={product._id}>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell>{product.stock}</Table.Cell>
                            <Table.Cell>
                                S/ {product.price_cost.toFixed(2)}
                            </Table.Cell>
                            <Table.Cell>{product.category.name}</Table.Cell>
                            <Table.Cell>{product.supplier.name}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    secondary
                                    onClick={() => {
                                        handlebtnEdit(product);
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    negative
                                    onClick={() => handleDelete(product)}
                                >
                                    Eliminar
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};
