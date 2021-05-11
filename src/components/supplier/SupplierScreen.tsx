import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { startDeleteSupplier, startGetAllSuppliers, startNewSupplier, startUpdateSupplier } from '../../actions/supplier';
import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Modal,
    ModalActions,
    Table,
    TextArea,
} from "semantic-ui-react";
import { useForm } from "../../hooks/useForm";
import { btnAddIcon } from "../ui/buttons/btnAddIcon";
import { ISupplier } from '../../reducers/suppliersReducer';

const initProductState = {
    _id: "",
    supplierName: "",
    description: "",
};

export const SupplierScreen = () => {
    const dispatch = useDispatch();
    const { suppliers } = useSelector((state: RootStateOrAny) => state.sup);

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formValues, handleInputChange, reset, newFormValue] = useForm(initProductState);
    const { supplierName, description } = formValues;

    useEffect(() => {
        dispatch(startGetAllSuppliers());
    }, [dispatch]);

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch( startNewSupplier(formValues) );
        reset();
        setOpenModal(false);
    };
    const handleUpdateSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(startUpdateSupplier(formValues));
        setOpenModal(false);
        setIsEdit(false);
        reset();
    };
    const handleEditSupplier = (supplier: ISupplier) => {
        newFormValue({
            _id: supplier._id,
            supplierName: supplier.name,
            description: supplier.description,
        });
        setIsEdit(true);
        setOpenModal(true);
    };
    const handleDeleteSupplier = (supplier: any) => {
        newFormValue({
            _id: supplier._id,
            supplierName: supplier.name
        });
        setOpenDeleteModel(true);
    };
    const deleteSupplier = () => {
        dispatch(startDeleteSupplier(formValues));
        setOpenDeleteModel(false);
        reset();
    };

    return (
        <div>
            <h2>Aqui los proveedores</h2>

            {/* Modal */}

            <Modal
                as={Form}
                onSubmit={(e: React.FormEvent<HTMLInputElement>) => {
                    isEdit ? handleUpdateSubmit(e) : handleSubmit(e);
                }}
                closeIcon
                closeOnEscape
                closeOnDimmerClick={false}
                onClose={() => {
                    setIsEdit(false);
                    reset();
                    setOpenModal(false);
                }}
                onOpen={() => setOpenModal(true)}
                open={openModal}
                trigger={btnAddIcon("Nuevo Proveedor")}
            >
                <Modal.Header>
                    {isEdit ? "Editar Proveedor" : "Nuevo Proveedor"}
                </Modal.Header>

                <Modal.Content>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label>Nombre del proveedor:</label>
                                    <input
                                        style={{ width: "50%" }}
                                        name="supplierName"
                                        value={supplierName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <br />
                                </Form.Field>
                                <Form.Field>
                                    {/* <label>Descripcion</label> */}
                                    {/* <input style={{width: '50%'}} name="description" value={description} onChange={ handleInputChange } /> */}
                                    <Form.Field
                                        control={TextArea}
                                        label="Descripción:"
                                        placeholder="Alguna descripcion sobre el proveedor (No es obligatoria)"
                                        name="description"
                                        value={description} 
                                        onChange={ handleInputChange }
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <ModalActions>
                    {/* <Button color='red' onClick={() => setOpenModal(false)}>
                            <Icon name='remove' /> Cancelar
                        </Button> */}
                    <Button color="green" type="submit" onClick={() => {}}>
                        <Icon name="checkmark" />{" "}
                        {isEdit ? "Actualizar" : "Crear"}
                    </Button>
                </ModalActions>
            </Modal>
            {/* Fin modal */}

            <Modal
                basic
                onClose={() => {setOpenDeleteModel(false); reset()}}
                onOpen={() => setOpenDeleteModel(true)}
                open={openDeleteModel}
                size='small'
                // trigger={<Button>Basic Modal</Button>}
                >
                <Header icon>
                    <Icon name='archive' />
                    Eliminar Proveedor
                </Header>
                <Modal.Content>
                    <p>
                    ¿Está segur@ de eliminar el proveedor {supplierName}?
                    Pulse en Eliminar para borrar el proveedor
                    Recuerde: Si quiere recuperar el proveedor deberá crear una nueva
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => {setOpenDeleteModel(false); reset()}}>
                    <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={() => deleteSupplier()}>
                    <Icon name='checkmark' /> Eliminar
                    </Button>
                </Modal.Actions>
            </Modal>

            {/* Inicio Table */}
            <Table sortable celled fixed className='table-width-auto' >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell

                        >
                            Nombre
                        </Table.HeaderCell>
                        <Table.HeaderCell

                        >
                            Descripción
                        </Table.HeaderCell>

                        <Table.HeaderCell
                            width="8">
                            Acciones
                        </Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        suppliers.map( (supplier:ISupplier) => (
                            <Table.Row key={supplier._id}>
                                <Table.Cell>{supplier.name}</Table.Cell>
                                <Table.Cell>{supplier.description}</Table.Cell>
                                <Table.Cell>
                                    <Button primary onClick={ () => console.log('Esta funcion aun no esta implementada') } >Ver mas</Button>
                                    <Button secondary onClick={ () => handleEditSupplier(supplier) } >Editar</Button>
                                    <Button negative onClick={() => handleDeleteSupplier(supplier)}>Eliminar</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
            {/* Fin Table */}
        </div>
    );
};
