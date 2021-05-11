import React from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getAllCategories, changeDirectionSort, startNewCategory, startUpdatedCategory, startDeleteCategory } from '../../actions/categories';
import { useEffect, useState } from 'react';
import { Button, Form, Grid, Header, Icon, Modal, ModalActions, Table } from 'semantic-ui-react';
import { ICategory } from '../../reducers/categoriesReducer';
import './categories-styles.css';
import { useForm } from '../../hooks/useForm';
import { btnAddIcon } from '../ui/buttons/btnAddIcon';

const initialCategoryState = {
    _id: '',
    categoryName: ''
}


export const Categories = () => {

    const dispatch = useDispatch();
    const { tableState, categories } = useSelector((state: RootStateOrAny) => state.cat)
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formValues, handleInputChange, reset, newFormValue] = useForm(initialCategoryState);
    const { categoryName }:any = formValues;

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])

    const btnAction = (name:string = 'Ver Productos') => (
        <Button primary>
            {name}
        </Button>
    )
    // const btnNewCategory = () => {
    //     return <Button content="Nueva Categoria" icon="add" labelPosition="left" />
    // }
    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch( startNewCategory(formValues) )
        reset();
        setOpenModal(false);
    }
    const handleUpdateSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch( startUpdatedCategory(formValues) );
        setOpenModal(false);
        setIsEdit(false);
        reset()
    }
    const handleEditCategory = (category:ICategory) => {
        newFormValue({
            _id: category._id,
            categoryName: category.name
        });
        setIsEdit(true)
        setOpenModal(true);
    }
    const handleDeleteCategory = (category:ICategory) => {
        newFormValue({
            _id: category._id,
            categoryName: category.name
        });
        setOpenDeleteModel(true)
    }
    const deleteCategory = () => {
        dispatch(startDeleteCategory(formValues));
        setOpenDeleteModel(false);
        reset();
    }
    // add
    return (
        <div>
            <h2>Aqui las categorias</h2>
            {/* Modal */}
            
                <Modal
                    as={Form}
                    onSubmit={(e: React.FormEvent<HTMLInputElement>)=> { isEdit ? handleUpdateSubmit(e) : handleSubmit(e) }}
                    closeIcon
                    closeOnEscape
                    closeOnDimmerClick={false}
                    onClose={() => { setIsEdit(false);reset(); setOpenModal(false);}}
                    onOpen={() => setOpenModal(true)}
                    open={openModal}
                    trigger={btnAddIcon('Nueva Categoria')}
                >
                    <Modal.Header>{isEdit ? 'Editar Categoria' : 'Nueva Categoría'}</Modal.Header>
                    
                    <Modal.Content>
                        <Grid columns={1}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label>Nombre de la categoria:</label>
                                        <input style={{width: '50%'}} name="categoryName" value={categoryName} onChange={handleInputChange} /><br/>
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <ModalActions>
                        {/* <Button color='red' onClick={() => setOpenModal(false)}>
                            <Icon name='remove' /> Cancelar
                        </Button> */}
                        <Button color='green' type="submit"  onClick={() =>{}}>
                            <Icon name='checkmark' /> {isEdit ? 'Actualizar' :'Crear'}
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
                    Eliminar Categoria
                </Header>
                <Modal.Content>
                    <p>
                    ¿Está segur@ de eliminar la categoria {categoryName}?
                    Pulse en Eliminar para borrar la categoría
                    Recuerde: Si quiere recuperar la categoria deberá crear una nueva
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => {setOpenDeleteModel(false); reset()}}>
                    <Icon name='remove' /> No
                    </Button>
                    <Button color='green' inverted onClick={() => deleteCategory()}>
                    <Icon name='checkmark' /> Eliminar
                    </Button>
                </Modal.Actions>
            </Modal>

            {/* Table Semantic Ui */}
            <Table sortable celled fixed className='table-width-auto' >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={tableState.column === 'name' ? tableState.direction : null}
                            onClick={ () => dispatch(changeDirectionSort('name')) } width="11"
                        >
                            Nombre
                        </Table.HeaderCell>
                        
                        <Table.HeaderCell
                            width="8">
                            Acciones
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        categories.map((category:ICategory) => (
                            <Table.Row key={category._id}>
                                <Table.Cell>{category.name}</Table.Cell>
                                <Table.Cell>
                                    {btnAction()}
                                    <Button secondary onClick={() => handleEditCategory(category)}>Editar</Button>
                                    <Button negative onClick={() => handleDeleteCategory(category)}>Eliminar</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
            {/* Fin Table Semantic Ui */}
        </div>
    )
}
